import os
import tempfile

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends
)
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.attachment_result import (
    AttachmentResult
)

from app.engines.attachment_analysis.service import (
    analyze_attachment
)

router = APIRouter()


@router.post("/")
async def detect_attachment(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    suffix = os.path.splitext(
        file.filename
    )[1]

    try:

        with tempfile.NamedTemporaryFile(

            delete=False,

            suffix=suffix

        ) as temp_file:

            contents = await file.read()

            temp_file.write(
                contents
            )

            temp_path = temp_file.name

        result = analyze_attachment(
            temp_path
        )
        
        # ==============================
        # Save Database
        # ==============================

        db_result = AttachmentResult(

            filename=file.filename,

            file_type=file.content_type,

            risk_score=result["risk_result"]["risk_score"],

            risk_level=result["risk_result"]["risk_level"]
        )

        db.add(db_result)

        db.commit()

        db.refresh(db_result)
        # ==============================
        # Return Response
        # ==============================

        result["filename"] = (
            file.filename
        )

        return result

    finally:

        if (
            'temp_path' in locals()
            and
            os.path.exists(temp_path)
        ):

            os.remove(
                temp_path
            )