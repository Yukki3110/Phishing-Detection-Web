from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.base import Base


class HomographResult(Base):

    __tablename__ = "homograph_results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    url = Column(
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
        DateTime(timezone=True),
        server_default=func.now()
    )