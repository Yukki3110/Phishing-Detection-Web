from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime, UTC

from app.db.base import Base

class ScanResult(Base):
    
    __tablename__ = "scan_results"
    
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    
    url = Column(String)
    
    risk_score = Column(Integer)
    
    created_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )