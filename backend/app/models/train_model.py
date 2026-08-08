"""
Train the scheme-eligibility model.

Pipeline:
  1. Generate synthetic profiles (generate_synthetic_data.py)
  2. Label each profile against every scheme using the verified rule engine
     (rules.py) -> this is the ground truth, not a guess
  3. Encode features (features.py)
  4. Train an XGBoost classifier per scheme (multi-label via one-vs-rest)
  5. Evaluate on a held-out test split, print per-scheme F1 (use these
     numbers in your pitch deck's technical slide)
  6. Fit a SHAP TreeExplainer for explainability at inference time
  7. Save model, encoder, explainer, and scheme metadata to ml_artifacts/

Run with:  python -m app.models.train_model
"""

import json
import os

import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import f1_score, accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputClassifier
from xgboost import XGBClassifier
import shap

from app.db.scheme_data import SCHEMES
from app.models.rules import is_eligible
from app.models.generate_synthetic_data import generate_profiles
from app.models.features import build_encoder, encode_features

ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "..", "ml_artifacts")
N_SYNTHETIC_PROFILES = 8000
RANDOM_STATE = 42


def build_label_matrix(profiles_df: pd.DataFrame) -> pd.DataFrame:
    """Run every profile through the rule engine against every scheme."""
    labels = {}
    for scheme in SCHEMES:
        scheme_name = scheme["name"]
        labels[scheme_name] = profiles_df.apply(
            lambda row: is_eligible(scheme, row.to_dict()), axis=1
        ).astype(int)
    return pd.DataFrame(labels)


def train():
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)

    print(f"Generating {N_SYNTHETIC_PROFILES} synthetic profiles...")
    profiles_df = generate_profiles(N_SYNTHETIC_PROFILES, seed=RANDOM_STATE)

    print("Labeling profiles against all schemes using the rule engine...")
    labels_df = build_label_matrix(profiles_df)

    # Drop schemes with near-zero or near-total positive rate — the model
    # can't learn anything useful from a label that's always 0 or always 1,
    # and XGBoost will throw errors on a single-class target.
    label_rates = labels_df.mean()
    print("\nPositive rate per scheme (fraction of synthetic profiles eligible):")
    print(label_rates.sort_values(ascending=False).to_string())

    usable_schemes = label_rates[(label_rates > 0.001) & (label_rates < 0.999)].index.tolist()
    dropped = set(labels_df.columns) - set(usable_schemes)
    if dropped:
        print(f"\nDropping schemes with degenerate label distribution (all-0 or all-1 "
              f"in this synthetic sample): {dropped}")
    labels_df = labels_df[usable_schemes]

    print("\nEncoding features...")
    encoder = build_encoder()
    X = encode_features(profiles_df, encoder, fit=True)
    y = labels_df.values

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=RANDOM_STATE
    )

    print(f"\nTraining XGBoost multi-label model on {len(usable_schemes)} schemes...")
    base_model = XGBClassifier(
        n_estimators=150,
        max_depth=4,
        learning_rate=0.1,
        eval_metric="logloss",
        random_state=RANDOM_STATE,
    )
    model = MultiOutputClassifier(base_model)
    model.fit(X_train, y_train)

    print("\nEvaluating on held-out test set...")
    y_pred = model.predict(X_test)

    per_scheme_f1 = {}
    for i, scheme_name in enumerate(usable_schemes):
        f1 = f1_score(y_test[:, i], y_pred[:, i], zero_division=0)
        acc = accuracy_score(y_test[:, i], y_pred[:, i])
        per_scheme_f1[scheme_name] = {"f1": round(f1, 3), "accuracy": round(acc, 3)}
        print(f"  {scheme_name:50s}  F1={f1:.3f}  Acc={acc:.3f}")

    overall_f1 = f1_score(y_test, y_pred, average="micro", zero_division=0)
    print(f"\nOverall micro-averaged F1: {overall_f1:.3f}")
    print("(Save this number — it's good material for your pitch deck's technical slide.)")

    print("\nFitting SHAP explainers per scheme (for inference-time explanations)...")
    # One TreeExplainer per underlying estimator, keyed by scheme name
    explainers = {}
    for i, scheme_name in enumerate(usable_schemes):
        estimator = model.estimators_[i]
        explainers[scheme_name] = shap.TreeExplainer(estimator)

    print("\nSaving artifacts...")
    joblib.dump(model, os.path.join(ARTIFACTS_DIR, "model.pkl"))
    joblib.dump(encoder, os.path.join(ARTIFACTS_DIR, "encoder.pkl"))
    joblib.dump(explainers, os.path.join(ARTIFACTS_DIR, "explainers.pkl"))
    joblib.dump(usable_schemes, os.path.join(ARTIFACTS_DIR, "scheme_names.pkl"))
    joblib.dump(list(X.columns), os.path.join(ARTIFACTS_DIR, "feature_columns.pkl"))

    with open(os.path.join(ARTIFACTS_DIR, "training_metrics.json"), "w") as f:
        json.dump({
            "n_profiles": N_SYNTHETIC_PROFILES,
            "n_schemes_used": len(usable_schemes),
            "schemes_dropped": list(dropped),
            "overall_micro_f1": round(float(overall_f1), 3),
            "per_scheme": per_scheme_f1,
        }, f, indent=2)

    print(f"\nDone. Artifacts saved to {ARTIFACTS_DIR}/")


if __name__ == "__main__":
    train()
