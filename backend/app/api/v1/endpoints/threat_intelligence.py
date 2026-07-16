from fastapi import APIRouter

from app.engines.threat_intelligence.service import (
    get_threat_dashboard
)

router = APIRouter()


@router.get("/dashboard")
def dashboard():

    return get_threat_dashboard()