def calculate_visual_risk(
    credential_result,
    urgency_result,
    trust_result,
    cloning_result,
    ui_result,
    cnn_result
):
    """
    Aggregate all visual phishing signals
    into one final phishing risk score.
    """

    score = 0

    # =========================
    # Credential Harvesting
    # =========================

    score += credential_result.get("score", 0)*1.5

    # =========================
    # Urgency Manipulation
    # =========================

    score += urgency_result.get("score", 0)

    # =========================
    # Trust Abuse
    # =========================

    score += trust_result.get("score", 0)

    # =========================
    # Layout Analysis
    # =========================

    score += cloning_result.get("score", 0)*2

    # =========================
    # UI Component Analysis
    # =========================

    score += ui_result.get("score", 0)
    
    input_analysis = ui_result.get(
        "input_analysis",
        {}
    )

    modal_analysis = ui_result.get(
        "modal_analysis",
        {}
    )
    
    # =========================
    # CNN Phishing Detector
    # =========================

    cnn_prediction = cnn_result.get(
        "prediction",
        "genuine"
    )

    cnn_confidence = cnn_result.get(
        "confidence",
        0
    )

    # CNN đóng vai trò quan trọng nhất

    if cnn_confidence >= 0.90:

        score += 50

    elif cnn_confidence >= 0.80:

        score += 40

    elif cnn_confidence >= 0.70:

        score += 30

    elif cnn_confidence >= 0.60:

        score += 20

    # Nếu CNN rất chắc chắn rằng đây là phishing
    # thì tối thiểu phải là HIGH

    if (
        cnn_prediction == "phishing"
        and
        cnn_confidence >= 0.85
    ):

        score = max(
            score,
            75
        )

    # =========================
    # Synergy Rules
    # =========================

    has_credentials = (
        credential_result.get("score", 0) > 0
    )

    has_urgency = (
        urgency_result.get("score", 0) > 0
    )

    has_trust = (
        trust_result.get("score", 0) > 0
    )

    many_inputs = (
        input_analysis.get("input_fields", 0) >= 2
    )

    modal_like = (
        modal_analysis.get("modal_like", False)
    )

    # Login + Urgency
    if has_credentials and has_urgency:
        score += 10

    # Login + Trust Abuse
    if has_credentials and has_trust:
        score += 10

    # Login + Modal
    if has_credentials and modal_like:
        score += 10

    # Many Inputs + Trust
    if many_inputs and has_trust:
        score += 5
        
    if has_credentials and has_urgency and has_trust:
        score += 20
    # CNN + Credential Harvesting

    if (
        cnn_prediction == "phishing"
        and has_credentials
    ):
        score += 10
        
    # CNN + Trust Abuse

    if (
        cnn_prediction == "phishing"
        and has_trust
    ):
        score += 5

    # =========================
    # Normalize
    # =========================

    score = min(score, 100)

    # =========================
    # Risk Level
    # =========================

    if score >= 75:
        level = "HIGH"

    elif score >= 45:
        level = "MEDIUM"

    else:
        level = "LOW"

    return {
        "risk_score": int(score),
        "risk_level": level
    }