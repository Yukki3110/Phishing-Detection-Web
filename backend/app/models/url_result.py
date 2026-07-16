from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func

from app.db.base import Base


from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from datetime import datetime

from app.db.base import Base


class URLDetectionResult(Base):

    __tablename__ = "url_detection_results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # URL người dùng nhập
    url = Column(
        String,
        nullable=False
    )

    # Prediction cuối cùng của hệ thống
    final_prediction = Column(
        String,
        nullable=False
    )
    # legitimate / suspicious / phishing

    final_risk_score = Column(
        Integer,
        nullable=False
    )

    final_risk_level = Column(
        String,
        nullable=False
    )
    # LOW / MEDIUM / HIGH

    # Timestamp
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )