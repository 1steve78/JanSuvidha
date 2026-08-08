from fastapi import APIRouter, HTTPException

from app.models.schemas import Profile
from app.models.match_schemas import MatchResponse, MatchResult
from app.models.predict import predict
from app.db.scheme_data import SCHEMES

router = APIRouter(tags=["match"])


@router.post("/match", response_model=MatchResponse)
def match_schemes(profile: Profile):
    """
    Given a citizen profile, return ranked welfare schemes they're likely
    eligible for, each with plain-language reasons (via SHAP), a document
    checklist, and the official apply link.
    """
    try:
        raw_results = predict(profile.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

    results = [MatchResult(**r) for r in raw_results]
    return MatchResponse(matches=results, count=len(results))


@router.get("/schemes")
def list_schemes():
    """Browse all schemes in the system (for a 'view all schemes' page)."""
    return [
        {
            "name": s["name"],
            "short_description": s["short_description"],
            "apply_url": s["apply_url"],
        }
        for s in SCHEMES
    ]
