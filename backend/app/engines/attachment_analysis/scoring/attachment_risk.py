def calculate_attachment_risk(

    extension_result,

    mime_result,

    macro_result,

    url_analysis

):
    """
    Aggregate all attachment signals
    into one final attachment risk score.
    """

    score = 0

    reasons = []

    # =================================
    # Extension Analysis
    # =================================

    ext_score = extension_result.get(
        "score",
        0
    )

    score += ext_score

    if ext_score > 0:

        reasons.append(
            "Suspicious extension"
        )

    # =================================
    # MIME Analysis
    # =================================

    mime_score = mime_result.get(
        "score",
        0
    )

    score += mime_score

    if mime_score > 0:

        reasons.append(
            "MIME mismatch detected"
        )

    # =================================
    # Macro Analysis
    # =================================

    macro_score = macro_result.get(
        "score",
        0
    )

    score += macro_score

    if macro_result.get(
        "macros_found",
        False
    ):

        reasons.append(
            "Document contains macros"
        )

    # =================================
    # URL Analysis
    # =================================

    suspicious_urls = 0

    for item in url_analysis:

        url_score = item.get(
            "risk_score",
            0
        )

        reputation = item.get(
            "reputation",
            {}
        )

        domain_score = reputation.get(
            "risk_score",
            0
        )

        combined = (
            url_score +
            domain_score
        )

        if combined >= 30:

            suspicious_urls += 1

            score += min(
                combined,
                20
            )

    # =================================
    # Synergy Rules
    # =================================

    if suspicious_urls >= 3:

        score += 15

        reasons.append(
            "Multiple suspicious URLs"
        )

    if (

        macro_result.get(
            "macros_found",
            False
        )

        and

        suspicious_urls > 0

    ):

        score += 20

        reasons.append(
            "Macros + suspicious URLs"
        )

    # =================================
    # Normalize
    # =================================

    score = min(
        score,
        100
    )

    # =================================
    # Risk Level
    # =================================

    if score >= 70:

        level = "HIGH"

    elif score >= 40:

        level = "MEDIUM"

    else:

        level = "LOW"

    return {

        "risk_score": int(score),

        "risk_level": level,

        "suspicious_url_count":
            suspicious_urls,

        "reasons":
            reasons
    }