from app.engines.url_detection.feature_extraction.lexical_features import *

from app.engines.url_detection.feature_extraction.content_features import (
    extract_content_features
)

from app.ml.inference.url_predictor import (
    predict_url_phishing
)


def calculate_url_risk(url):

    score = 0

    # =================================
    # Lexical Features
    # =================================

    lexical_features = {

        "url_length": url_length(url),

        "dot_count": count_dots(url),

        "contains_ip": int(
            contains_ip(url)
        ),

        "digit_count": count_digits(url),

        "digit_ratio": digit_ratio(url),

        "letter_count": count_letters(url),

        "letter_ratio": letter_ratio(url),

        "hyphen_count": count_hyphens(url),

        "slash_count": count_slashes(url),

        "subdomain_count": count_subdomains(url),

        "hostname_length": hostname_length(url),

        "domain_length": domain_length(url),

        "path_length": path_length(url),

        "query_length": query_length(url),

        "has_https": has_https(url),

        "has_at_symbol": has_at_symbol(url),

        "has_double_slash_redirect":
            has_double_slash_redirect(url),

        "suspicious_word_count":
            count_suspicious_words(url),

        "special_char_count":
            count_special_characters(url),

        "special_char_ratio":
            special_char_ratio(url),

        "equal_count":
            count_equals(url),

        "question_mark_count":
            count_question_marks(url),

        "ampersand_count":
            count_ampersands(url),

        "url_entropy":
            url_entropy(url),

        "has_punycode":
            has_punycode(url),

        "consecutive_hyphen_count":
            count_consecutive_hyphens(url),

        "longest_token_length":
            longest_token_length(url)
    }

    # =================================
    # Content Features
    # =================================

    content_features = extract_content_features(
        url
    )

    # =================================
    # Features for Random Forest
    # =================================

    rf_features = {

        "URLLength":
            lexical_features["url_length"],

        "DomainLength":
            lexical_features["domain_length"],

        "IsDomainIP":
            lexical_features["contains_ip"],

        "NoOfSubDomain":
            lexical_features["subdomain_count"],

        "NoOfLettersInURL":
            lexical_features["letter_count"],

        "LetterRatioInURL":
            lexical_features["letter_ratio"],

        "NoOfDegitsInURL":
            lexical_features["digit_count"],

        "DegitRatioInURL":
            lexical_features["digit_ratio"],

        "NoOfEqualsInURL":
            lexical_features["equal_count"],

        "NoOfQMarkInURL":
            lexical_features["question_mark_count"],

        "NoOfAmpersandInURL":
            lexical_features["ampersand_count"],

        "NoOfOtherSpecialCharsInURL":
            lexical_features["special_char_count"],

        "SpacialCharRatioInURL":
            lexical_features["special_char_ratio"],

        "IsHTTPS":
            lexical_features["has_https"],

        "HasTitle":
            content_features["has_title"],

        "HasFavicon":
            content_features["has_favicon"],

        "NoOfURLRedirect":
            content_features["redirect_count"],

        "HasDescription":
            content_features["has_description"],

        "NoOfiFrame":
            content_features["iframes"],

        "HasSubmitButton":
            content_features["has_submit_button"],

        "HasHiddenFields":
            content_features["has_hidden_fields"],

        "HasPasswordField":
            content_features["login_form"]
    }

    # =================================
    # Random Forest Prediction
    # =================================

    rf_result = predict_url_phishing(
        rf_features
    )

    rf_prediction = rf_result.get(
        "prediction",
        "legitimate"
    )

    rf_confidence = rf_result.get(
        "confidence",
        0
    )

    print(
        f"RF Prediction: {rf_prediction}"
    )

    print(
        f"RF Confidence: {rf_confidence}"
    )

    # =================================
    # Random Forest Scoring
    # =================================

    if (

        rf_prediction == "phishing"

        and

        rf_confidence >= 0.60

    ):

        score += int(
            rf_confidence * 60
        )

    # extremely confident prediction

    if (

        rf_prediction == "phishing"

        and

        rf_confidence >= 0.90

    ):

        score = max(
            score,
            75
        )

    # =================================
    # Custom Rule-Based Features
    # =================================

    if lexical_features[
        "has_double_slash_redirect"
    ]:
        score += 15

    if lexical_features[
        "has_at_symbol"
    ]:
        score += 10

    if lexical_features[
        "has_punycode"
    ]:
        score += 20

    if lexical_features[
        "url_entropy"
    ] >= 4.5:
        score += 10

    if lexical_features[
        "consecutive_hyphen_count"
    ] > 0:
        score += 10

    if lexical_features[
        "longest_token_length"
    ] >= 25:
        score += 10

    if lexical_features[
        "suspicious_word_count"
    ] >= 2:
        score += 15
        
    if lexical_features["contains_ip"]:
        score += 20

    # =================================
    # Synergy Rules
    # =================================

    has_login = (

        content_features[
            "login_form"
        ] > 0
    )

    has_keywords = (

        lexical_features[
            "suspicious_word_count"
        ] >= 2
    )

    high_entropy = (

        lexical_features[
            "url_entropy"
        ] >= 4.5
    )

    has_puny = (

        lexical_features[
            "has_punycode"
        ] > 0
    )

    many_redirects = (

        content_features[
            "redirect_count"
        ] >= 2
    )

    if has_login and has_keywords:
        score += 10

    if has_login and high_entropy:
        score += 10

    if has_login and many_redirects:
        score += 10

    if has_login and has_puny:
        score += 15

    if (

        rf_prediction == "phishing"

        and has_login

    ):
        score += 10

    if (

        rf_prediction == "phishing"

        and has_keywords

    ):
        score += 5

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

    if score >= 75:

        level = "HIGH"

    elif score >= 45:

        level = "MEDIUM"

    else:

        level = "LOW"

    # =================================
    # Final Result
    # =================================

    return {

        "risk_score":
            int(score),

        "risk_level":
            level,

        "lexical_features":
            lexical_features,

        "content_features":
            content_features,

        "rf_result":
            rf_result
    }