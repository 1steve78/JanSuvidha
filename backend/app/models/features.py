"""
Feature encoding — shared between training (train_model.py) and inference
(predict.py) so a profile is encoded IDENTICALLY at both stages. This is a
common source of silent bugs in ML pipelines, so it lives in one place.
"""

from typing import Any, Dict

import pandas as pd
from sklearn.preprocessing import OneHotEncoder

from app.models.generate_synthetic_data import OCCUPATIONS, GENDERS, CATEGORIES, STATES

NUMERIC_FEATURES = ["income", "age", "family_size"]
BOOLEAN_FEATURES = ["land_ownership", "student_status"]
CATEGORICAL_FEATURES = ["occupation", "gender", "category", "state"]

# Fixed category lists so the one-hot encoder produces the same columns
# every time, whether it's seeing 10,000 training rows or 1 live profile.
CATEGORICAL_CATEGORIES = [OCCUPATIONS, GENDERS, CATEGORIES, STATES]


def build_encoder() -> OneHotEncoder:
    return OneHotEncoder(
        categories=CATEGORICAL_CATEGORIES,
        handle_unknown="ignore",  # unseen state/occupation at inference -> all-zero row, doesn't crash
        sparse_output=False,
    )


def encode_features(df: pd.DataFrame, encoder: OneHotEncoder, fit: bool = False) -> pd.DataFrame:
    """
    Encode a profile DataFrame into a numeric feature matrix.
    Pass fit=True only during training (to fit the encoder); at inference
    time, load the already-fitted encoder and call with fit=False.
    """
    numeric = df[NUMERIC_FEATURES].astype(float).reset_index(drop=True)
    boolean = df[BOOLEAN_FEATURES].astype(int).reset_index(drop=True)

    cat_data = df[CATEGORICAL_FEATURES]
    if fit:
        cat_encoded = encoder.fit_transform(cat_data)
    else:
        cat_encoded = encoder.transform(cat_data)

    cat_columns = encoder.get_feature_names_out(CATEGORICAL_FEATURES)
    cat_df = pd.DataFrame(cat_encoded, columns=cat_columns).reset_index(drop=True)

    return pd.concat([numeric, boolean, cat_df], axis=1)


def profile_dict_to_df(profile: Dict[str, Any]) -> pd.DataFrame:
    """Convert a single profile dict (e.g. from the API) into a one-row DataFrame."""
    return pd.DataFrame([{
        "income": profile["income"],
        "age": profile["age"],
        "occupation": profile["occupation"],
        "gender": profile["gender"],
        "category": profile["category"],
        "state": profile["state"],
        "land_ownership": profile.get("land_ownership", False),
        "student_status": profile.get("student_status", False),
        "family_size": profile.get("family_size", 1),
    }])
