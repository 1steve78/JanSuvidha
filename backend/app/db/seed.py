"""
Seed the database with real Indian government welfare schemes.

The scheme data itself lives in scheme_data.py (no DB dependency, so it
can be reused by the rule engine and tests). This module handles only the
DB-specific part: creating tables and inserting rows.

Run with:  python -m app.db.seed
"""

from app.db.database import Base, engine, SessionLocal
from app.db.models import Scheme
from app.db.scheme_data import SCHEMES


def seed():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        existing = db.query(Scheme).count()
        if existing > 0:
            print(f"Schemes table already has {existing} rows — skipping insert. "
                  f"Delete rows manually or drop the table first to reseed.")
            return

        print(f"Inserting {len(SCHEMES)} schemes...")
        for data in SCHEMES:
            db.add(Scheme(**data))
        db.commit()
        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
