from enum import Enum
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class CategoryEnum(str, Enum):
    harassment = "harassment"
    corruption = "corruption"
    civic_issue = "civic_issue"
    safety = "safety"

class StatusEnum(str, Enum):
    submitted = "submitted"
    under_review = "under_review"
    in_progress = "in_progress"
    resolved = "resolved"

class ReportCreate(BaseModel):
    category: CategoryEnum
    description: str
    photo_url: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None

class ReportUpdate(BaseModel):
    status: Optional[StatusEnum] = None
    escalated: Optional[bool] = None

class ReportStatusLogResponse(BaseModel):
    id: int
    report_id: UUID
    status: StatusEnum
    changed_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ReportMapData(BaseModel):
    id: UUID
    lat: float
    lng: float
    status: StatusEnum

    model_config = ConfigDict(from_attributes=True)

class ReportResponse(BaseModel):
    id: UUID
    category: CategoryEnum
    description: str
    photo_url: Optional[str]
    lat: Optional[float]
    lng: Optional[float]
    status: StatusEnum
    escalated: bool
    created_at: datetime
    updated_at: datetime
    
    # Optional list of status logs when tracking
    status_logs: Optional[List[ReportStatusLogResponse]] = None

    model_config = ConfigDict(from_attributes=True)

class ReportStatsResponse(BaseModel):
    total_reports: int
    escalated_reports: int
    by_status: dict[str, int]
    by_category: dict[str, int]

