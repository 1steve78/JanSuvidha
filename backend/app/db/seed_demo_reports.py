"""
Seed realistic DEMO grievance reports so the admin and public dashboards
have data to render (charts, KPI cards, urgent queue) instead of showing
empty states.

This is entirely SYNTHETIC data — no real citizen information. Reports
stay anonymous by design (no name field exists on the model at all), so
there's nothing to anonymize; these are just plausible-sounding fake
reports spread across categories, statuses, and dates.

Run with:  python -m app.db.seed_demo_reports [--count 250] [--reset]

--reset wipes existing reports/status-log rows first (only demo data,
since this whole table is meant to be demo-only pre-launch). Without
--reset, it appends on top of whatever's already there.
"""

import argparse
import random
from datetime import datetime, timedelta, timezone

from app.db.database import SessionLocal
from app.db.models import Report, ReportStatusLog

# Indian city centers for scattering lat/lng — keeps the map view realistic
# without pinpointing anything to an exact street address.
CITY_CENTERS = [
    ("Kolkata", 22.5726, 88.3639),
    ("Delhi", 28.6139, 77.2090),
    ("Mumbai", 19.0760, 72.8777),
    ("Bengaluru", 12.9716, 77.5946),
    ("Chennai", 13.0827, 80.2707),
    ("Hyderabad", 17.3850, 78.4867),
    ("Pune", 18.5204, 73.8567),
    ("Bhopal", 23.2599, 77.4126),
    ("Patna", 25.5941, 85.1376),
    ("Lucknow", 26.8467, 80.9462),
]

CATEGORY_WEIGHTS = {
    "civic_issue": 0.45,
    "safety": 0.25,
    "corruption": 0.20,
    "harassment": 0.10,
}

STATUS_WEIGHTS = {
    "resolved": 0.68,
    "in_progress": 0.14,
    "under_review": 0.13,
    "submitted": 0.05,
}

DESCRIPTION_TEMPLATES = {
    "civic_issue": [
        "Streetlight has been non-functional for over two weeks near {loc}, making the area unsafe at night.",
        "Garbage collection has been irregular in {loc} for the past month, causing overflow and bad odor.",
        "Large pothole on the main road near {loc} is damaging vehicles and causing traffic slowdowns.",
        "Water supply has been erratic in {loc}, with only a few hours of supply every alternate day.",
        "Open drain near {loc} is not covered and poses a hazard, especially for children walking to school.",
        "Public park in {loc} has broken equipment that hasn't been repaired despite earlier complaints.",
    ],
    "safety": [
        "Open manhole near {loc} has no barricade or warning sign, risk to pedestrians especially at night.",
        "Broken pedestrian railing on the bridge near {loc} needs urgent repair before an accident occurs.",
        "No traffic signal at the busy junction near {loc}, several near-miss accidents reported by locals.",
        "Construction site near {loc} has no safety barriers, debris falling onto the public footpath.",
        "Stray dog aggression reported repeatedly near {loc}, residents requesting municipal action.",
    ],
    "corruption": [
        "Local office near {loc} allegedly demanding extra unofficial payment for document processing.",
        "Delay in ration card renewal near {loc} unless additional payment is made beyond official fees.",
        "Irregularities reported in fund allocation for a public works project near {loc}.",
        "Officials at the local center near {loc} reportedly favoring specific applicants for permits.",
    ],
    "harassment": [
        "Repeated harassment reported near a public transport stop close to {loc}, requesting patrol increase.",
        "Verbal harassment incident reported near a market area in {loc}, requesting safety review.",
        "Intimidation reported against a local vendor near {loc}, requesting authority intervention.",
    ],
}


def _weighted_choice(weights: dict) -> str:
    keys = list(weights.keys())
    probs = list(weights.values())
    return random.choices(keys, weights=probs, k=1)[0]


def _random_timestamp(days_back: int) -> datetime:
    """
    Random timestamp within the last `days_back` days, skewed slightly
    toward more recent dates so the 7d/30d filters have reasonable volume
    too (not just the 1y view).
    """
    days_ago = int(random.triangular(0, days_back, days_back * 0.15))
    seconds_offset = random.randint(0, 86400)
    return datetime.now(timezone.utc) - timedelta(days=days_ago, seconds=seconds_offset)


def _jitter_coords(lat: float, lng: float, spread: float = 0.15) -> tuple[float, float]:
    """Scatter around a city center — city-level realism, not exact-address precision."""
    return (
        round(lat + random.uniform(-spread, spread), 6),
        round(lng + random.uniform(-spread, spread), 6),
    )


def generate_reports(count: int, days_back: int = 180) -> list[Report]:
    reports = []
    for _ in range(count):
        category = _weighted_choice(CATEGORY_WEIGHTS)
        status = _weighted_choice(STATUS_WEIGHTS)
        city_name, base_lat, base_lng = random.choice(CITY_CENTERS)
        lat, lng = _jitter_coords(base_lat, base_lng)

        template = random.choice(DESCRIPTION_TEMPLATES[category])
        description = template.format(loc=f"{city_name} area")

        created_at = _random_timestamp(days_back)

        # High-priority / escalated: only unresolved reports that have been
        # sitting a while — matches the "escalated" semantics from the rule
        # engine (stale + still 'submitted'), but we also allow a slice of
        # long-open in_progress/under_review ones to feel like a real
        # "urgent queue" for the demo.
        is_old_and_unresolved = (
            status in ("submitted", "under_review", "in_progress")
            and (datetime.now(timezone.utc) - created_at) > timedelta(hours=72)
        )
        escalated = is_old_and_unresolved and random.random() < 0.05

        updated_at = created_at
        if status == "resolved":
            # Resolution typically lands within a few days — keeps
            # "Avg. Resolution Time" looking realistic (~2 days) rather
            # than instant or absurdly long.
            resolution_delay = timedelta(hours=random.triangular(6, 96, 36))
            updated_at = created_at + resolution_delay

        report = Report(
            category=category,
            description=description,
            photo_url=None,
            lat=lat,
            lng=lng,
            status=status,
            escalated=escalated,
            created_at=created_at,
            updated_at=updated_at,
        )
        reports.append(report)
    return reports


def seed(count: int, reset: bool):
    db = SessionLocal()
    try:
        if reset:
            print("Clearing existing demo reports and status logs...")
            db.query(ReportStatusLog).delete()
            db.query(Report).delete()
            db.commit()

        print(f"Generating {count} synthetic demo reports...")
        reports = generate_reports(count)
        db.add_all(reports)
        db.commit()

        # Add a status-log entry for each report so the audit trail isn't empty
        for report in reports:
            db.add(ReportStatusLog(report_id=report.id, status=report.status, changed_at=report.updated_at))
        db.commit()

        total = db.query(Report).count()
        resolved = db.query(Report).filter(Report.status == "resolved").count()
        escalated = db.query(Report).filter(Report.escalated.is_(True)).count()

        print(f"Done. Total reports in DB: {total}")
        print(f"  Resolved: {resolved} ({resolved/total*100:.1f}%)")
        print(f"  Escalated/urgent: {escalated}")
    finally:
        db.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Seed demo grievance reports.")
    parser.add_argument("--count", type=int, default=250, help="Number of demo reports to generate")
    parser.add_argument("--reset", action="store_true", help="Delete existing reports before seeding")
    args = parser.parse_args()

    seed(args.count, args.reset)
