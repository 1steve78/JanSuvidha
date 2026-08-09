from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db
from app.db.models import Report, ReportStatusLog
from app.models.report_schemas import ReportCreate, ReportUpdate, ReportResponse, ReportStatsResponse, ReportMapData
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

@router.get("/public/metrics")
def get_public_dashboard_metrics(days: Optional[int] = None, db: Session = Depends(get_db)):
    """
    Returns pre-aggregated metrics for the public dashboard.
    Enforces privacy by suppressing small counts (<5) into "Other" 
    and grouping time series by Week to prevent single-day deanonymization.
    """
    query = db.query(Report)
    if days is not None:
        threshold = datetime.now(timezone.utc) - timedelta(days=days)
        query = query.filter(Report.created_at >= threshold)
    reports = query.all()
    
    counts = {}
    total_reports = len(reports)
    for r in reports:
        cat = (r.category or "").replace("_", " ").title()
        counts[cat] = counts.get(cat, 0) + 1
    
    category_data = []
    other_count = 0
    for name, value in counts.items():
        if value < 5:
            other_count += value
        else:
            pct = f"{(value / total_reports * 100):.1f}%" if total_reports else "0.0%"
            category_data.append({"name": name, "value": value, "percentage": pct})
    
    if other_count > 0:
        pct = f"{(other_count / total_reports * 100):.1f}%" if total_reports else "0.0%"
        display_val = "<5" if other_count < 5 else str(other_count)
        category_data.append({"name": "Other (Low Volume)", "value": other_count, "percentage": pct, "displayValue": display_val})
        
    by_week = {}
    for r in reports:
        d = r.created_at
        week_start = d - timedelta(days=d.weekday())
        period = f"Week of {week_start.strftime('%b %d')}"
        if period not in by_week:
            by_week[period] = {"received": 0, "resolved": 0, "sort_key": week_start}
        by_week[period]["received"] += 1
        if r.status == "resolved":
            by_week[period]["resolved"] += 1
            
    bar_data_raw = []
    for k, v in by_week.items():
        bar_data_raw.append({
            "period": k,
            "received": v["received"],
            "resolved": v["resolved"],
            "sort_key": v["sort_key"]
        })
    bar_data_raw.sort(key=lambda x: x["sort_key"])
    bar_data = [{"period": x["period"], "received": x["received"], "resolved": x["resolved"]} for x in bar_data_raw]

    resolved_count = sum(x["resolved"] for x in bar_data)
    
    urgent_reports_query = db.query(Report).filter(Report.escalated == True).order_by(Report.created_at.desc()).limit(5).all()
    urgent_count = db.query(Report).filter(Report.escalated == True).count()
    res_rate = f"{(resolved_count / total_reports * 100):.1f}%" if total_reports > 0 else "0.0%"

    urgent_list = [
        {
            "id": str(r.id),
            "category": r.category,
            "description": r.description,
            "status": r.status,
            "escalated": r.escalated,
            "location": f"{r.lat:.4f}, {r.lng:.4f}" if (r.lat and r.lng) else "Unknown",
            "created_at": r.created_at.isoformat(),
        } for r in urgent_reports_query
    ]

    return {
        "categoryData": category_data,
        "barData": bar_data,
        "resRateStr": res_rate,
        "total": total_reports,
        "resolvedCount": resolved_count,
        "urgentCount": urgent_count,
        "urgentPriorityItems": urgent_list
    }

@router.get("/map-data", response_model=list[ReportMapData])
def get_public_map_data(db: Session = Depends(get_db)):
    """
    Get geotagged report data for the public map (heatmap).
    """
    reports = db.query(Report).filter(Report.lat.isnot(None), Report.lng.isnot(None)).all()
    return reports

@router.get("/schemes/density-map")
def get_scheme_density_map():
    """
    Returns mock scheme application counts per Indian state.
    """
    return [
        {"state": "Andhra Pradesh", "application_count": 1250},
        {"state": "Assam", "application_count": 420},
        {"state": "Bihar", "application_count": 3100},
        {"state": "Delhi", "application_count": 890},
        {"state": "Gujarat", "application_count": 1800},
        {"state": "Haryana", "application_count": 750},
        {"state": "Karnataka", "application_count": 2100},
        {"state": "Kerala", "application_count": 1100},
        {"state": "Madhya Pradesh", "application_count": 2800},
        {"state": "Maharashtra", "application_count": 4500},
        {"state": "Punjab", "application_count": 920},
        {"state": "Rajasthan", "application_count": 1600},
        {"state": "Tamil Nadu", "application_count": 3400},
        {"state": "Uttar Pradesh", "application_count": 5200},
        {"state": "West Bengal", "application_count": 2900}
    ]

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
        location=report_in.location,
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
def get_all_reports(days: Optional[int] = None, db: Session = Depends(get_db), current_admin: str = Depends(get_current_admin)):
    """
    Fetch all reports for the admin dashboard.
    Triggers auto-escalation before returning results.
    """
    auto_escalate_reports(db)
    query = db.query(Report)
    if days is not None:
        threshold = datetime.now(timezone.utc) - timedelta(days=days)
        query = query.filter(Report.created_at >= threshold)
    reports = query.order_by(Report.created_at.desc()).all()
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
