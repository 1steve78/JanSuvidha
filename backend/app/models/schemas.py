from typing import Optional
from pydantic import BaseModel, Field


class Profile(BaseModel):
    """
    A citizen's profile — the input to both the rule engine (for generating
    training labels) and the FastAPI /match endpoint later (for live inference).
    Keep this in sync with the feature set used in rules.py and train_model.py.
    """

    income: float = Field(..., ge=0, description="Annual household income in INR")
    age: int = Field(..., ge=0, le=120)
    occupation: str = Field(
        ...,
        description=(
            "One of: farmer, laborer, self_employed, unorganized_worker, "
            "domestic_worker, street_vendor, small_business_owner, student, "
            "salaried, unemployed, other"
        ),
    )
    gender: str = Field(..., description="'male' | 'female' | 'other'")
    category: str = Field(..., description="'SC' | 'ST' | 'OBC' | 'General'")
    state: str = Field(..., description="State of residence")
    land_ownership: bool = False
    student_status: bool = False
    family_size: Optional[int] = Field(default=1, ge=1)

    class Config:
        json_schema_extra = {
            "example": {
                "income": 180000,
                "age": 34,
                "occupation": "farmer",
                "gender": "male",
                "category": "OBC",
                "state": "West Bengal",
                "land_ownership": True,
                "student_status": False,
                "family_size": 4,
            }
        }
