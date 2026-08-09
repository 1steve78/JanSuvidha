import os
import sys
import random
from datetime import datetime, timedelta

# Ensure the backend directory is in the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal, Base, engine
from app.db.models import Report, ReportStatusLog

def seed_india_data():
    db = SessionLocal()
    
    # Check if there are already a lot of reports
    if db.query(Report).count() > 50:
        print("Database already has more than 50 reports, skipping seeding.")
        db.close()
        return

    categories = ["civic", "health", "housing", "education", "safety"]
    statuses = ["submitted", "under_review", "in_progress", "resolved"]
    
    # Bounding box for India roughly (excluding far east and islands for simplicity)
    lat_min, lat_max = 8.4, 32.5
    lng_min, lng_max = 68.7, 89.0

    print("Generating 200 random grievance reports across India...")
    
    for i in range(200):
        lat = random.uniform(lat_min, lat_max)
        lng = random.uniform(lng_min, lng_max)
        status = random.choices(statuses, weights=[30, 20, 20, 30])[0]
        
        # Determine escalation (older submitted ones might be escalated)
        created_days_ago = random.randint(1, 14)
        escalated = status == "submitted" and created_days_ago > 3
        
        report = Report(
            category=random.choice(categories),
            description=f"Generated mock grievance report #{i}",
            lat=lat,
            lng=lng,
            status=status,
            escalated=escalated,
            created_at=datetime.utcnow() - timedelta(days=created_days_ago)
        )
        db.add(report)
        db.commit()
        db.refresh(report)
        
        # Add a log
        log = ReportStatusLog(
            report_id=report.id,
            status=status
        )
        db.add(log)
    
    db.commit()
    print("Seeding complete.")
    db.close()

if __name__ == "__main__":
    seed_india_data()
