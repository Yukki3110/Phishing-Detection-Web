from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.engines.dashboard.service import (
    get_dashboard
)

router = APIRouter()


@router.get("/")
def dashboard(
    db: Session = Depends(get_db)
):

    return get_dashboard(db)