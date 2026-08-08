"""
Inference module for the scheme-matching model.

Loads all trained artifacts ONCE at import time (not per-request) so the
FastAPI /match endpoint stays fast. Converts SHAP contributions into
plain-language reasons — this is what answers the "explainable, not a
black box" requirement in the problem statement.
"""

import os
from typing import Any, Dict, List

import joblib
import numpy as np
import pandas as pd
import shap

from app.db.scheme_data import SCHEMES
from app.models.features import encode_features, profile_dict_to_df

ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "..", "ml_artifacts")

# Confidence threshold below which a scheme isn't shown at all, even if
# it's in the top-K by rank — avoids surfacing low-confidence noise.
MIN_CONFIDENCE = 0.5
DEFAULT_TOP_K = 8
MAX_REASONS_PER_SCHEME = 3

SCHEMES_BY_NAME: Dict[str, Dict[str, Any]] = {s["name"]: s for s in SCHEMES}


def _load_artifacts():
    missing = [
        f for f in ["model.pkl", "encoder.pkl", "explainers.pkl", "scheme_names.pkl", "feature_columns.pkl"]
        if not os.path.exists(os.path.join(ARTIFACTS_DIR, f))
    ]
    if missing:
        raise RuntimeError(
            f"Missing ML artifacts: {missing} in {ARTIFACTS_DIR}. "
            f"Run `python -m app.models.train_model` first."
        )

    model = joblib.load(os.path.join(ARTIFACTS_DIR, "model.pkl"))
    encoder = joblib.load(os.path.join(ARTIFACTS_DIR, "encoder.pkl"))
    explainers = joblib.load(os.path.join(ARTIFACTS_DIR, "explainers.pkl"))
    scheme_names = joblib.load(os.path.join(ARTIFACTS_DIR, "scheme_names.pkl"))
    feature_columns = joblib.load(os.path.join(ARTIFACTS_DIR, "feature_columns.pkl"))
    return model, encoder, explainers, scheme_names, feature_columns


# Module-level load — runs once when this module is first imported
# (e.g. at FastAPI startup), not on every request.
_MODEL, _ENCODER, _EXPLAINERS, _SCHEME_NAMES, _FEATURE_COLUMNS = _load_artifacts()


def _humanize_feature(feature_name: str, profile: Dict[str, Any]) -> str:
    """
    Turn an encoded feature name (e.g. 'occupation_farmer', 'income') into a
    plain-language phrase describing that aspect of the profile.
    """
    if feature_name == "income":
        return f"annual income of ₹{profile['income']:,.0f}"
    if feature_name == "age":
        return f"age {profile['age']}"
    if feature_name == "family_size":
        return f"family size of {profile['family_size']}"
    if feature_name == "land_ownership":
        return "land ownership" if profile.get("land_ownership") else "no land ownership"
    if feature_name == "student_status":
        return "student status" if profile.get("student_status") else "not currently a student"

    for prefix, label in [
        ("occupation_", "occupation"),
        ("gender_", "gender"),
        ("category_", "category"),
        ("state_", "residency in"),
    ]:
        if feature_name.startswith(prefix):
            value = feature_name[len(prefix):]
            return f"{label} ({value})" if label != "residency in" else f"residency in {value}"

    return feature_name  # fallback, shouldn't normally hit this


def _get_shap_reasons(
    scheme_name: str, X_live: pd.DataFrame, profile: Dict[str, Any]
) -> List[str]:
    """
    Run SHAP on the single live profile for one scheme's estimator and
    return the top positive-contributing features as human-readable strings.
    """
    explainer = _EXPLAINERS[scheme_name]
    shap_values = explainer.shap_values(X_live)

    # SHAP's return shape varies by version/model type — normalize to a
    # flat array of per-feature contributions toward the "eligible" class.
    if isinstance(shap_values, list):
        values = np.array(shap_values[1][0])  # class-1 (eligible) contributions
    else:
        arr = np.array(shap_values)
        values = arr[0, :, 1] if arr.ndim == 3 else arr[0]

    contributions = list(zip(X_live.columns, values))
    # Keep only features that push TOWARD eligibility, ranked by strength
    positive = [c for c in contributions if c[1] > 0]
    positive.sort(key=lambda c: c[1], reverse=True)

    reasons = []
    for feature_name, _ in positive[:MAX_REASONS_PER_SCHEME]:
        reasons.append(_humanize_feature(feature_name, profile))

    if not reasons:
        reasons = ["meets the scheme's baseline eligibility criteria"]

    return reasons


def predict(profile: Dict[str, Any], top_k: int = DEFAULT_TOP_K) -> List[Dict[str, Any]]:
    """
    Given a profile dict, return the top-K eligible schemes ranked by
    confidence, each with plain-language reasons and scheme metadata.
    """
    profile_df = profile_dict_to_df(profile)
    X_live = encode_features(profile_df, _ENCODER, fit=False)
    # Ensure column order matches training exactly
    X_live = X_live[_FEATURE_COLUMNS]

    scored = []
    for i, scheme_name in enumerate(_SCHEME_NAMES):
        estimator = _MODEL.estimators_[i]
        proba = estimator.predict_proba(X_live)[0][1]
        if proba >= MIN_CONFIDENCE:
            scored.append((scheme_name, float(proba)))

    scored.sort(key=lambda s: s[1], reverse=True)
    top_matches = scored[:top_k]

    results = []
    for scheme_name, confidence in top_matches:
        scheme_meta = SCHEMES_BY_NAME.get(scheme_name, {})
        reasons = _get_shap_reasons(scheme_name, X_live, profile)
        results.append({
            "scheme_name": scheme_name,
            "confidence": round(confidence, 3),
            "reasons": reasons,
            "short_description": scheme_meta.get("short_description"),
            "document_checklist": scheme_meta.get("document_checklist"),
            "apply_url": scheme_meta.get("apply_url"),
        })

    return results


if __name__ == "__main__":
    # Quick manual smoke test
    example_profile = {
        "income": 140000,
        "age": 28,
        "occupation": "farmer",
        "gender": "female",
        "category": "ST",
        "state": "Odisha",
        "land_ownership": True,
        "student_status": False,
        "family_size": 5,
    }
    results = predict(example_profile)
    for r in results:
        print(f"\n{r['scheme_name']}  (confidence={r['confidence']})")
        for reason in r["reasons"]:
            print(f"  - {reason}")
