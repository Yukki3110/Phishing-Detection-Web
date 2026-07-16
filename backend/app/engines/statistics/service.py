from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.url_result import URLDetectionResult
from app.models.domain_result import DomainIntelligenceResult
from app.models.homograph_result import HomographResult
from app.models.visual_result import VisualDetectionResult
from app.models.attachment_result import AttachmentResult

def get_overview(db: Session):

    url = db.query(URLDetectionResult).count()

    domain = db.query(DomainIntelligenceResult).count()

    homograph = db.query(HomographResult).count()

    visual = db.query(VisualDetectionResult).count()

    attachment = db.query(AttachmentResult).count()

    return {

        "total_scans": (
            url +
            domain +
            homograph +
            visual +
            attachment
        ),

        "url_scans": url,

        "domain_scans": domain,

        "homograph_scans": homograph,

        "visual_scans": visual,

        "attachment_scans": attachment
    }
    
def get_risk_distribution(db: Session):

    levels = {

        "HIGH": 0,

        "MEDIUM": 0,

        "LOW": 0
    }

    tables = [

        (
            URLDetectionResult,
            URLDetectionResult.final_risk_level
        ),

        (
            DomainIntelligenceResult,
            DomainIntelligenceResult.risk_level
        ),

        (
            HomographResult,
            HomographResult.risk_level
        ),

        (
            VisualDetectionResult,
            VisualDetectionResult.risk_level
        ),

        (
            AttachmentResult,
            AttachmentResult.risk_level
        )
    ]

    for model, column in tables:

        rows = (

            db.query(
                column,
                func.count()
            )

            .group_by(column)

            .all()

        )

        for level, count in rows:

            if level in levels:

                levels[level] += count

    return levels

def get_module_distribution(db: Session):

    overview = get_overview(db)

    return {

        "URL": overview["url_scans"],

        "Domain": overview["domain_scans"],

        "Homograph": overview["homograph_scans"],

        "Visual": overview["visual_scans"],

        "Attachment": overview["attachment_scans"]

    }
    
def get_daily_scans(db: Session):

    daily = {}

    tables = [

        (
            URLDetectionResult,
            URLDetectionResult.created_at
        ),

        (
            DomainIntelligenceResult,
            DomainIntelligenceResult.created_at
        ),

        (
            HomographResult,
            HomographResult.created_at
        ),

        (
            VisualDetectionResult,
            VisualDetectionResult.created_at
        ),

        (
            AttachmentResult,
            AttachmentResult.created_at
        )
    ]

    for model, created in tables:

        rows = (

            db.query(

                func.date(created),

                func.count()

            )

            .group_by(
                func.date(created)
            )

            .all()

        )

        for day, count in rows:

            daily[day] = daily.get(day, 0) + count

    result = [

        {

            "date": str(day),

            "count": count

        }

        for day, count in sorted(daily.items())

    ]

    return result

def get_top_domains(db: Session):

    rows = (

        db.query(

            DomainIntelligenceResult.domain,

            func.count()

        )

        .group_by(
            DomainIntelligenceResult.domain
        )

        .order_by(
            func.count().desc()
        )

        .limit(10)

        .all()

    )

    return [

        {

            "domain": domain,

            "count": count

        }

        for domain, count in rows

    ]
    
def get_top_urls(db: Session):

    rows = (

        db.query(

            URLDetectionResult.url,

            func.count()

        )

        .group_by(
            URLDetectionResult.url
        )

        .order_by(
            func.count().desc()
        )

        .limit(10)

        .all()

    )

    return [

        {

            "url": url,

            "count": count

        }

        for url, count in rows

    ]
    
