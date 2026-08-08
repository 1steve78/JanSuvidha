from typing import List, Optional
from pydantic import BaseModel


class MatchResult(BaseModel):
    scheme_name: str
    confidence: float
    reasons: List[str]
    short_description: Optional[str] = None
    document_checklist: Optional[List[str]] = None
    apply_url: Optional[str] = None


class MatchResponse(BaseModel):
    matches: List[MatchResult]
    count: int
