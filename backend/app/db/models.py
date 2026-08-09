import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    Boolean,
    ARRAY,
    Text,
    DateTime,
    ForeignKey,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.db.database import Base


class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    short_description = Column(Text)

    min_income = Column(Numeric)
    max_income = Column(Numeric)
    occupation_list = Column(ARRAY(String))  # e.g. ['farmer', 'laborer']
    age_min = Column(Integer)
    age_max = Column(Integer)
    gender = Column(String, default="any")  # 'any' | 'female' | 'male'
    category_eligible = Column(ARRAY(String))  # ['SC','ST','OBC','General']
    state_scope = Column(String, default="central")  # 'central' or state name
    land_ownership_required = Column(Boolean, default=False)
    student_status_required = Column(Boolean, default=False)
    document_checklist = Column(ARRAY(String))
    apply_url = Column(String)


class Report(Base):
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    category = Column(String, nullable=False)  # harassment | corruption | civic_issue | safety
    description = Column(Text, nullable=False)
    photo_url = Column(String, nullable=True)
    lat = Column(Numeric, nullable=True)
    lng = Column(Numeric, nullable=True)
    location = Column(String, nullable=True)

    status = Column(String, default="submitted")  # submitted | under_review | in_progress | resolved
    escalated = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Intentionally NO reporter name / contact field — anonymity is a
    # core feature of this module, not an omission.


class ReportStatusLog(Base):
    __tablename__ = "report_status_log"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    status = Column(String, nullable=False)
    changed_at = Column(DateTime(timezone=True), server_default=func.now())
