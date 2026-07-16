from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.schemas.url import URLRequest

from app.engines.url_detection.service import (
    analyze_url
)

from app.db.dependencies import get_db

from app.models.url_result import URLDetectionResult

router = APIRouter()


@router.post("/")
def detect_url(
    data: URLRequest,
    
    db: Session = Depends(get_db)
):

    result = analyze_url(
        data.url
    )
    
    # =================================
    # Save to Database
    # =================================

    record = URLDetectionResult(

        url=data.url,

        final_prediction=result["prediction"],

        final_risk_score=result["risk_score"],

        final_risk_level=result["risk_level"],
    )

    db.add(record)

    db.commit()

    db.refresh(record)
    
    # =================================
    # Return Response
    # =================================

    return {

    "url": data.url,

    "prediction":
        result["prediction"],

    "risk_score":
        result["risk_score"],

    "risk_level":
        result["risk_level"],
        
    "url_analysis":
        result["url_analysis"],

    "domain_info":
        result["domain_info"]
}