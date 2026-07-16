from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.schemas.homograph import HomographRequest

from app.db.dependencies import get_db

from app.models.homograph_result import (
    HomographResult
)

from app.engines.homograph_detection.service import(
    analyze_domain
)

router = APIRouter()

@router.post("/")
def detect_homograph(data: HomographRequest, db: Session = Depends(get_db)):
    
    result = analyze_domain(
        data.url
    )
    # =================================
    # Save DB
    # =================================

    db_result = HomographResult(

        url=data.url,

        risk_score=result["risk"],

        risk_level=result["risk_level"]
    )

    db.add(db_result)

    db.commit()

    db.refresh(db_result)
    
    return result