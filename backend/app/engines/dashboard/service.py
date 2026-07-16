from sqlalchemy.orm import Session

from app.engines.statistics.service import (
    get_overview,
    get_risk_distribution,
    get_module_distribution,
    get_daily_scans,
    get_top_domains,
    get_top_urls
)

from app.engines.threat_intelligence.service import (
    get_threat_dashboard
)


def get_dashboard(db: Session):

    statistics = {

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

    threat = get_threat_dashboard()

    return {

        "statistics": statistics,

        "threat": threat

    }