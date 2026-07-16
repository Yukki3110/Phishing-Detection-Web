from datetime import datetime, timezone


def calculate_reputation_score(
    creation_date,
    ssl_info,
    dns_analysis
):
    """
    Calculate overall domain reputation score.
    """

    score = 0
    reasons = []

    # =====================================
    # SSL Analysis
    # =====================================

    if not ssl_info.get("valid", False):

        score += 30

        reasons.append(
            "Invalid or missing SSL certificate"
        )

    # =====================================
    # DNS Analysis
    # =====================================

    score += dns_analysis.get(
        "score",
        0
    )

    reasons.extend(
        dns_analysis.get(
            "issues",
            []
        )
    )

    # =====================================
    # Domain Age Analysis
    # =====================================

    # =====================================
    # Domain Age Analysis
    # =====================================

    if creation_date:

        try:

            if isinstance(
                creation_date,
                list
            ):
                creation_date = creation_date[0]

            # xử lý timezone
            if creation_date.tzinfo is not None:

                now = datetime.now(
                    timezone.utc
                )

            else:

                now = datetime.now()

            age_days = (
                now - creation_date
            ).days

            if age_days < 30:

                score += 30

                reasons.append(
                    "Very young domain (<30 days)"
                )

            elif age_days < 180:

                score += 15

                reasons.append(
                    "Recently registered domain"
                )

        except Exception as e:

            print(
                f"Domain age error: {e}"
            )

            score += 10

            reasons.append(
                "Unable to verify domain age"
            )

    else:

        score += 20

        reasons.append(
            "Unknown domain creation date"
        )

    # =====================================
    # Normalize
    # =====================================

    score = min(score, 100)

    # =====================================
    # Risk Level
    # =====================================

    if score >= 60:

        level = "HIGH"

    elif score >= 30:

        level = "MEDIUM"

    else:

        level = "LOW"

    return {

        "risk_score": score,

        "risk_level": level,

        "reasons": reasons
    }