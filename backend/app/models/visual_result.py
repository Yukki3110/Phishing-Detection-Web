from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.base import Base


class VisualDetectionResult(Base):

    __tablename__ = "visual_detection_results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    image_name = Column(
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