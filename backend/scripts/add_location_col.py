import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set.")

engine = create_engine(DATABASE_URL)

def add_column():
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE reports ADD COLUMN location VARCHAR;"))
            conn.commit()
            print("Successfully added 'location' column to 'reports' table.")
        except Exception as e:
            print("Error or column already exists:", e)

if __name__ == "__main__":
    add_column()
