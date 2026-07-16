from app.utils.url_utils import extract_domain

from app.engines.domain_intelligence.service import (
    analyze_domain
)

from app.engines.url_detection.url_risk_scorer import (
    calculate_url_risk
)


def analyze_url(url):

    print("URL Detection Service Running...")

    # =================================
    # URL Detection
    # =================================

    risk_result = calculate_url_risk(
        url
    )
    
    # =================================
    # URL Analysis Details
    # =================================

    url_analysis = {

        "lexical": {

            "has_https":
                risk_result["lexical_features"]["has_https"],

            "contains_ip":
                risk_result["lexical_features"]["contains_ip"],

            "has_punycode":
                risk_result["lexical_features"]["has_punycode"],

            "suspicious_keywords":
                risk_result["lexical_features"]["suspicious_word_count"],

            "url_entropy":
                risk_result["lexical_features"]["url_entropy"],

            "redirect_pattern":
                risk_result["lexical_features"]["has_double_slash_redirect"],

            "subdomains":
                risk_result["lexical_features"]["subdomain_count"],

            "url_length":
                risk_result["lexical_features"]["url_length"]
        },

        "content": {

            "login_form":
                risk_result["content_features"]["login_form"],

            "iframes":
                risk_result["content_features"]["iframes"],

            "redirects":
                risk_result["content_features"]["redirect_count"],

            "has_title":
                risk_result["content_features"]["has_title"],

            "has_favicon":
                risk_result["content_features"]["has_favicon"],

            "hidden_fields":
                risk_result["content_features"]["has_hidden_fields"]
        },

    }

    # =================================
    # Domain Intelligence
    # =================================

    domain = extract_domain(url)

    domain_info = analyze_domain(
        domain
    )

    # =================================
    # Individual Scores
    # =================================

    url_score = risk_result[
        "risk_score"
    ]

    domain_score = domain_info[
        "reputation"
    ][
        "risk_score"
    ]

    # =================================
    # Score Fusion
    # =================================

    # Strongest engine dominates

    final_score = max(
        url_score,
        domain_score
    )

    # Synergy bonus:
    # if both modules detect suspicious behaviour

    if (

        url_score >= 45

        and

        domain_score >= 45

    ):

        final_score += 10

    # Cap

    final_score = min(
        final_score,
        100
    )

    # =================================
    # Final Risk Level
    # =================================

    if final_score >= 75:

        risk_level = "HIGH"

        prediction = "phishing"

    elif final_score >= 45:

        risk_level = "MEDIUM"

        prediction = "suspicious"

    else:

        risk_level = "LOW"

        prediction = "legitimate"

    # =================================
    # Final Result
    # =================================

    return {

        "prediction":
            prediction,

        "risk_score":
            final_score,

        "risk_level":
            risk_level,
            
        "url_analysis":
            url_analysis,

        "domain_info":
            domain_info
    }