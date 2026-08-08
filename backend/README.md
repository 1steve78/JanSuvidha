# Welfare Platform — Backend (Step 1: Database Layer)

## Setup

```bash
cd welfare-backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Configure your database

1. Create a free Postgres database at https://neon.tech (or use Supabase).
2. Copy the connection string it gives you.
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Open `.env` and paste your real connection string into `DATABASE_URL`.
   **Never commit `.env` or paste your real connection string anywhere public** —
   it contains your database password.

## Create tables and seed data

```bash
python -m app.db.seed
```

This will:
- Create the `schemes`, `reports`, and `report_status_log` tables
- Insert 20 real Indian government welfare schemes with eligibility criteria

You should see:
```
Creating tables...
Inserting 20 schemes...
Done.
```

## Verify

Connect with any Postgres client (or `psql "$DATABASE_URL"`) and run:
```sql
SELECT name, min_income, max_income, occupation_list FROM schemes LIMIT 5;
```

## Next steps

- Step 2: Rule engine (`app/models/rules.py`) — deterministic eligibility functions
  that generate labeled training data from these schemes.
- Step 3: Synthetic profile generation + XGBoost training.
- Step 4+: FastAPI routers for `/match` and `/reports`.

⚠️ Eligibility figures (income thresholds, age ranges) in `seed.py` are based
on general public knowledge of these schemes and may be outdated or simplified.
Verify against official scheme pages before quoting exact numbers in your
hackathon pitch — the officials' current criteria are what actually matters.
