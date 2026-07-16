from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import Boolean

from datetime import datetime

from app.db.base import Base


class DomainIntelligenceResult(Base):

    __tablename__ = "domain_intelligence_results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    domain = Column(
        String,
        nullable=False
    )

    risk_score = Column(
        Integer,
        nullable=False
    )

    risk_level = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )