from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.engines.statistics.service import (
    get_overview,
    get_risk_distribution,
    get_module_distribution,
    get_daily_scans,
    get_top_domains,
    get_top_urls
)

router = APIRouter()


@router.get("/")
def statistics(
    db: Session = Depends(get_db)
):

    return {

        "overview":
            get_overview(db),

        "risk_distribution":
            get_risk_distribution(db),

        "module_distribution":
            get_module_distribution(db),

        "daily_scans":
            get_daily_scans(db),

        "top_domains":
            get_top_domains(db),

        "top_urls":
            get_top_urls(db)

    }