from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.domain import DomainRequest

from app.db.dependencies import get_db


from app.utils.url_utils import extract_domain

from app.models.domain_result import (
    DomainIntelligenceResult
)

from app.engines.domain_intelligence.service import analyze_domain

router = APIRouter()


@router.post("/")
def detect_domain(
    data: DomainRequest,
    
    db: Session = Depends(get_db)
):

    domain = extract_domain(
        data.url
    )

    result = analyze_domain(
        domain
    )
    
    # =================================
    # Save to Database
    # =================================

    db_result = DomainIntelligenceResult(

        domain=domain,


        risk_score=
            result["reputation"]["risk_score"],

        risk_level=
            result["reputation"]["risk_level"]
    )

    db.add(db_result)

    db.commit()

    db.refresh(db_result)

    # =================================
    # Return API Response
    # =================================

    return {

        "domain": domain,

        "domain_analysis": result

    }