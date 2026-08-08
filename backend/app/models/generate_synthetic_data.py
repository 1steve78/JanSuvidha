"""
Generate synthetic citizen profiles for training data.

These are NOT real citizens — they're randomly generated profiles spanning
realistic ranges of income, age, occupation, etc. We run each one through
the verified rule engine (rules.py) to get its eligibility labels, then
train a model on (profile -> labels) so the model can generalize beyond
exact rule lookups (handle missing/fuzzy fields, rank by confidence).

Run standalone to inspect the generated data:
    python -m app.models.generate_synthetic_data
"""

import numpy as np
import pandas as pd

OCCUPATIONS = [
    "farmer", "laborer", "self_employed", "unorganized_worker",
    "domestic_worker", "street_vendor", "small_business_owner",
    "student", "salaried", "unemployed", "other",
]
# Weighted so the distribution roughly resembles who'd actually use a
# welfare-matching tool — skewed toward informal/lower-income occupations
OCCUPATION_WEIGHTS = [0.18, 0.15, 0.10, 0.10, 0.06, 0.06, 0.05,
                      0.12, 0.10, 0.05, 0.03]

GENDERS = ["male", "female", "other"]
GENDER_WEIGHTS = [0.49, 0.49, 0.02]

CATEGORIES = ["SC", "ST", "OBC", "General"]
CATEGORY_WEIGHTS = [0.20, 0.10, 0.40, 0.30]

STATES = [
    "West Bengal", "Bihar", "Uttar Pradesh", "Maharashtra", "Karnataka",
    "Tamil Nadu", "Odisha", "Rajasthan", "Madhya Pradesh", "Gujarat",
    "Kerala", "Punjab", "Haryana", "Telangana", "Assam",
]


def generate_profiles(n: int, seed: int = 42) -> pd.DataFrame:
    """Generate n synthetic profiles as a DataFrame."""
    rng = np.random.default_rng(seed)

    # Income: log-normal, most people cluster low, long tail to the right.
    # Median around ~₹1.5L/year, matching typical household income spread.
    income = rng.lognormal(mean=11.9, sigma=0.9, size=n)
    income = np.clip(income, 0, 3_000_000).round(-2)  # cap and round to nearest 100

    age = rng.integers(low=5, high=85, size=n)

    occupation = rng.choice(OCCUPATIONS, size=n, p=OCCUPATION_WEIGHTS)
    # Force consistency: under-18s who aren't explicitly working should skew student
    occupation = np.where(age < 18, "student", occupation)

    gender = rng.choice(GENDERS, size=n, p=GENDER_WEIGHTS)
    category = rng.choice(CATEGORIES, size=n, p=CATEGORY_WEIGHTS)
    state = rng.choice(STATES, size=n)

    # Land ownership more likely for farmers
    land_ownership = np.array([
        rng.random() < (0.7 if occ == "farmer" else 0.15) for occ in occupation
    ])

    # Student status: true for occupation=='student' or age<18, with a little noise
    student_status = np.array([
        (occ == "student" or a < 18) for occ, a in zip(occupation, age)
    ])

    family_size = rng.integers(low=1, high=9, size=n)

    df = pd.DataFrame({
        "income": income,
        "age": age,
        "occupation": occupation,
        "gender": gender,
        "category": category,
        "state": state,
        "land_ownership": land_ownership,
        "student_status": student_status,
        "family_size": family_size,
    })
    return df


if __name__ == "__main__":
    df = generate_profiles(10)
    print(df.to_string())
    print(f"\nGenerated {len(df)} sample profiles. Income stats:")
    print(df["income"].describe())
