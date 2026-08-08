"""
Deterministic eligibility rule engine.

This is the SOURCE OF TRUTH for scheme eligibility — not a fallback.
Step 3 (synthetic data generation) runs every synthetic profile through
these rules to build the labeled training matrix that the XGBoost model
learns from. If a rule here is wrong, the model learns the wrong thing,
so keep these functions simple, readable, and easy to sanity-check.
"""

from typing import Any, Dict


def _matches_income(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    min_income = scheme.get("min_income")
    max_income = scheme.get("max_income")
    income = profile["income"]

    if min_income is not None and income < min_income:
        return False
    if max_income is not None and income > max_income:
        return False
    return True


def _matches_age(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    age_min = scheme.get("age_min")
    age_max = scheme.get("age_max")
    age = profile["age"]

    if age_min is not None and age < age_min:
        return False
    if age_max is not None and age > age_max:
        return False
    return True


def _matches_occupation(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    occupation_list = scheme.get("occupation_list")
    # None or empty list means "no occupation restriction" — everyone qualifies
    if not occupation_list:
        return True
    return profile["occupation"] in occupation_list


def _matches_gender(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    scheme_gender = scheme.get("gender") or "any"
    if scheme_gender == "any":
        return True
    return profile["gender"] == scheme_gender


def _matches_category(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    category_eligible = scheme.get("category_eligible")
    if not category_eligible:
        return True
    return profile["category"] in category_eligible


def _matches_state(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    state_scope = scheme.get("state_scope") or "central"
    if state_scope == "central":
        return True
    return profile["state"].strip().lower() == state_scope.strip().lower()


def _matches_land_ownership(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    if scheme.get("land_ownership_required"):
        return bool(profile.get("land_ownership"))
    return True


def _matches_student_status(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    if scheme.get("student_status_required"):
        return bool(profile.get("student_status"))
    return True


# Each check paired with a human-readable label used for explanations
# and for debugging *why* a profile failed a scheme.
CHECKS = [
    ("income", _matches_income),
    ("age", _matches_age),
    ("occupation", _matches_occupation),
    ("gender", _matches_gender),
    ("category", _matches_category),
    ("state", _matches_state),
    ("land_ownership", _matches_land_ownership),
    ("student_status", _matches_student_status),
]


def is_eligible(scheme: Dict[str, Any], profile: Dict[str, Any]) -> bool:
    """True if the profile passes every eligibility check for this scheme."""
    return all(check_fn(scheme, profile) for _, check_fn in CHECKS)


def eligibility_breakdown(scheme: Dict[str, Any], profile: Dict[str, Any]) -> Dict[str, bool]:
    """
    Same as is_eligible but returns a per-criterion pass/fail dict.
    Useful for debugging the rule engine and for building human-readable
    explanations later (independent of the SHAP-based ML explanations).
    """
    return {name: check_fn(scheme, profile) for name, check_fn in CHECKS}


def check_all_schemes(schemes: list[Dict[str, Any]], profile: Dict[str, Any]) -> Dict[str, bool]:
    """Run one profile against every scheme. Returns {scheme_name: eligible_bool}."""
    return {scheme["name"]: is_eligible(scheme, profile) for scheme in schemes}
