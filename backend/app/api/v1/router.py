from fastapi import APIRouter
from app.api.v1.endpoints import health, homograph, url_detection, domain_intelligence, attachment_analysis, visual_detection, statistics, threat_intelligence, dashboard

router = APIRouter()

router.include_router(
    health.router,
    prefix="/health",
    tags=["Health"]
)

router.include_router(
    homograph.router,
    prefix="/homograph",
    tags=["Homograph Detection"]
)

router.include_router(
    url_detection.router,
    prefix="/url_detection",
    tags=["URL Detection"]
)

router.include_router(
    domain_intelligence.router,
    prefix="/domain_intelligence",
    tags=["Domain Intelligence"]
)

router.include_router(
    attachment_analysis.router,
    prefix="/attachment-analysis",
    tags=["Attachment Analysis"]
)

router.include_router(
    visual_detection.router,
    prefix="/visual_detection",
    tags=["Visual Detection"]
)

router.include_router(
    statistics.router,
    prefix="/statistics",
    tags=["Statistics"]
)

router.include_router(
    threat_intelligence.router,
    prefix="/threat",
    tags=["Threat Intelligence"]

)

router.include_router(

    dashboard.router,

    prefix="/dashboard",

    tags=["Dashboard"]

)