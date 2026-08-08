from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db
from app.db.models import Report, ReportStatusLog
from app.models.report_schemas import ReportCreate, ReportUpdate, ReportResponse, ReportStatsResponse
from app.dependencies import get_current_admin

import os
from datetime import datetime, timedelta, timezone
from sqlalchemy import func

router = APIRouter(prefix="/reports", tags=["reports"])

def auto_escalate_reports(db: Session):
    """
    Helper function to automatically escalate reports that have been in 'submitted'
    state for longer than the escalation threshold (default 72 hours).
    """
    escalation_hours = int(os.getenv("ESCALATION_HOURS", 72))
    cutoff_time = datetime.now(timezone.utc) - timedelta(hours=escalation_hours)
    
    # We find reports that are submitted, not escalated, and older than the cutoff
    db.query(Report).filter(
        Report.status == "submitted",
        Report.escalated == False,
        Report.created_at < cutoff_time
    ).update({"escalated": True})
    
    db.commit()

@router.get("/public", response_model=ReportStatsResponse)
def get_public_stats(db: Session = Depends(get_db)):
    """
    Get aggregated civic report stats. 
    Triggers auto-escalation before compiling stats to ensure freshness.
    """
    auto_escalate_reports(db)

    # Calculate counts
    total_count = db.query(func.count(Report.id)).scalar() or 0
    escalated_count = db.query(func.count(Report.id)).filter(Report.escalated == True).scalar() or 0

    status_counts_raw = db.query(Report.status, func.count(Report.id)).group_by(Report.status).all()
    by_status = {status: count for status, count in status_counts_raw}

    category_counts_raw = db.query(Report.category, func.count(Report.id)).group_by(Report.category).all()
    by_category = {category: count for category, count in category_counts_raw}

    return ReportStatsResponse(
        total_reports=total_count,
        escalated_reports=escalated_count,
        by_status=by_status,
        by_category=by_category
    )

@router.post("/submit", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
def submit_report(report_in: ReportCreate, db: Session = Depends(get_db)):
    """
    Submit a new anonymous civic report.
    Returns the generated report with a UUID for tracking.
    """
    new_report = Report(
        category=report_in.category.value,
        description=report_in.description,
        photo_url=report_in.photo_url,
        lat=report_in.lat,
        lng=report_in.lng,
        status="submitted"
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    # Initial status log
    initial_log = ReportStatusLog(
        report_id=new_report.id,
        status="submitted"
    )
    db.add(initial_log)
    db.commit()

    return new_report

@router.get("/track/{report_id}", response_model=ReportResponse)
def track_report(report_id: UUID, db: Session = Depends(get_db)):
    """
    Fetch a report by its UUID along with its status timeline.
    """
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    status_logs = db.query(ReportStatusLog).filter(ReportStatusLog.report_id == report_id).order_by(ReportStatusLog.changed_at.asc()).all()
    
    # We create a dictionary from the SQLAlchemy model and attach the logs for the Pydantic schema
    response_data = report.__dict__.copy()
    response_data["status_logs"] = status_logs
    
    return response_data

@router.get("/admin/all", response_model=list[ReportResponse])
def get_all_reports(db: Session = Depends(get_db), current_admin: str = Depends(get_current_admin)):
    """
    Fetch all reports for the admin dashboard.
    Triggers auto-escalation before returning results.
    """
    auto_escalate_reports(db)
    reports = db.query(Report).order_by(Report.created_at.desc()).all()
    return reports

@router.patch("/{report_id}/status", response_model=ReportResponse)
def update_report_status(report_id: UUID, update_data: ReportUpdate, db: Session = Depends(get_db), current_admin: str = Depends(get_current_admin)):
    """
    Update a report's status or escalation flag. 
    Logs the status change if the status is modified.
    """
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    status_changed = False
    new_status = None

    if update_data.status and update_data.status.value != report.status:
        report.status = update_data.status.value
        status_changed = True
        new_status = update_data.status.value
    
    if update_data.escalated is not None:
        report.escalated = update_data.escalated

    db.commit()
    db.refresh(report)

    if status_changed:
        new_log = ReportStatusLog(
            report_id=report.id,
            status=new_status
        )
        db.add(new_log)
        db.commit()

    return report
