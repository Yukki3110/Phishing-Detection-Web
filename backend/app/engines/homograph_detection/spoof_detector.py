from .character_analysis import (
    detect_scripts,
    has_mixed_scripts,
    count_confusable_characters
)
from .punycode import (
    decode_punycode,
    detect_punycode
)

def calculate_spoof_risk(domain: str):
    
    is_punycode = detect_punycode(domain)
    
    decoded_domain = decode_punycode(domain)
    
    analysis_text = decoded_domain

    scripts = detect_scripts(analysis_text)

    mixed = has_mixed_scripts(analysis_text)

    confusable = count_confusable_characters(
        analysis_text
    )

    # =========================
    # Risk Calculation
    # =========================

    risk = 0

    if mixed:

        risk += 50

    risk += confusable["count"] * 10
    
    # Punycode

    if is_punycode:

        risk += 30

    if decoded_domain != domain:

        risk += 10

    risk = min(risk, 100)

    # =========================
    # Risk Level
    # =========================

    if risk >= 70:

        risk_level = "HIGH"

    elif risk >= 40:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"

    # =========================
    # Final Result
    # =========================

    return {

        "scripts":
            scripts,

        "mixed_scripts":
            mixed,

        "confusable_count":
            confusable["count"],

        "confusable_chars":
            confusable["characters"],
            
        "is_punycode":
            is_punycode,

        "decoded_domain":
            decoded_domain,

        "risk":
            risk,

        "risk_level":
            risk_level,
    }