"""
Sanity-check the rule engine against hand-crafted profiles with known
expected outcomes, BEFORE using it to generate training labels in Step 3.

Run with:  python -m app.models.test_rules

This does NOT require a database connection — it imports the scheme
definitions directly from seed.py.
"""

from app.db.scheme_data import SCHEMES
from app.models.rules import is_eligible, check_all_schemes

# Index schemes by name for quick lookup in assertions
SCHEMES_BY_NAME = {s["name"]: s for s in SCHEMES}


def scheme(name: str):
    return SCHEMES_BY_NAME[name]


TEST_CASES = [
    # (description, profile, scheme_name, expected_result)
    (
        "Landless laborer should NOT qualify for PM-KISAN (needs land ownership)",
        dict(income=90000, age=35, occupation="laborer", gender="male",
             category="OBC", state="West Bengal", land_ownership=False,
             student_status=False, family_size=4),
        "PM-KISAN",
        False,
    ),
    (
        "Landholding farmer SHOULD qualify for PM-KISAN",
        dict(income=90000, age=35, occupation="farmer", gender="male",
             category="OBC", state="West Bengal", land_ownership=True,
             student_status=False, family_size=4),
        "PM-KISAN",
        True,
    ),
    (
        "High-income household should NOT qualify for Ayushman Bharat (income cap ₹2.5L)",
        dict(income=600000, age=40, occupation="salaried", gender="male",
             category="General", state="Karnataka", land_ownership=False,
             student_status=False, family_size=3),
        "Ayushman Bharat (PM-JAY)",
        False,
    ),
    (
        "Low-income household SHOULD qualify for Ayushman Bharat",
        dict(income=150000, age=40, occupation="laborer", gender="female",
             category="SC", state="Karnataka", land_ownership=False,
             student_status=False, family_size=5),
        "Ayushman Bharat (PM-JAY)",
        True,
    ),
    (
        "Male applicant should NOT qualify for PM Ujjwala Yojana (women-only)",
        dict(income=80000, age=30, occupation="laborer", gender="male",
             category="OBC", state="Bihar", land_ownership=False,
             student_status=False, family_size=6),
        "PM Ujjwala Yojana",
        False,
    ),
    (
        "Low-income woman SHOULD qualify for PM Ujjwala Yojana",
        dict(income=80000, age=30, occupation="laborer", gender="female",
             category="OBC", state="Bihar", land_ownership=False,
             student_status=False, family_size=6),
        "PM Ujjwala Yojana",
        True,
    ),
    (
        "45-year-old should NOT qualify for Atal Pension Yojana (age cap 40)",
        dict(income=120000, age=45, occupation="street_vendor", gender="male",
             category="General", state="Maharashtra", land_ownership=False,
             student_status=False, family_size=2),
        "Atal Pension Yojana",
        False,
    ),
    (
        "General-category college student should NOT qualify for SC/ST/OBC-only Post-Matric scholarship",
        dict(income=200000, age=20, occupation="student", gender="female",
             category="General", state="Tamil Nadu", land_ownership=False,
             student_status=True, family_size=4),
        "National Scholarship Portal — Post-Matric",
        False,
    ),
    (
        "Low-income OBC college student SHOULD qualify for Post-Matric scholarship",
        dict(income=180000, age=20, occupation="student", gender="female",
             category="OBC", state="Tamil Nadu", land_ownership=False,
             student_status=True, family_size=4),
        "National Scholarship Portal — Post-Matric",
        True,
    ),
]


def run_tests():
    passed = 0
    failed = 0

    for description, profile, scheme_name, expected in TEST_CASES:
        actual = is_eligible(scheme(scheme_name), profile)
        status = "PASS" if actual == expected else "FAIL"
        if status == "PASS":
            passed += 1
        else:
            failed += 1
        print(f"[{status}] {description}  (expected={expected}, got={actual})")

    print(f"\n{passed} passed, {failed} failed out of {len(TEST_CASES)} test cases.")

    if failed > 0:
        print(
            "\n⚠️  Fix rules.py or the scheme data in seed.py before moving to "
            "Step 3 — the training labels will only be as correct as these rules."
        )
    else:
        print("\n✅ Rule engine looks correct. Safe to proceed to Step 3 (synthetic data + training).")

    # Bonus: show a full eligibility scan for one example profile, so you can
    # eyeball that a realistic profile gets a sensible set of matches.
    example_profile = dict(
        income=140000, age=28, occupation="farmer", gender="female",
        category="ST", state="Odisha", land_ownership=True,
        student_status=False, family_size=5,
    )
    print("\nExample profile eligibility scan:")
    results = check_all_schemes(SCHEMES, example_profile)
    for name, eligible in results.items():
        if eligible:
            print(f"  ✓ {name}")


if __name__ == "__main__":
    run_tests()
