from fastapi import APIRouter, UploadFile, File
from app.engines.visual_detection.service import analyze_visual_image
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.visual_result import VisualDetectionResult

router = APIRouter()

@router.post("/")
async def detect_visual(
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    contents = await image.read()
    
    result = analyze_visual_image(contents)
    
    risk_score = result["risk_result"]["risk_score"]

    risk_level = result["risk_result"]["risk_level"]
    
    # =================================
    # Save Database
    # =================================

    db_result = VisualDetectionResult(

        image_name=image.filename,

        risk_score=risk_score,

        risk_level=risk_level
    )

    db.add(db_result)

    db.commit()

    db.refresh(db_result)
    return {
        "filename": image.filename,
        **result
    }