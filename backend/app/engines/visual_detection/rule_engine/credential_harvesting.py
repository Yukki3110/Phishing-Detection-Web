from app.engines.visual_detection.ocr_loader import get_ocr_reader

CREDENTIAL_KEYWORDS = [
    "password",
    "username",
    "login",
    "log in",
    "sign in",
    "email",
    "otp",
    "verification code",
    "credit card",
    "card number"
]


def detect_credential_harvesting(image):
    
    reader = get_ocr_reader()

    results = reader.readtext(image)

    text = " ".join(
        [item[1] for item in results]
    ).lower()

    matches = []

    for keyword in CREDENTIAL_KEYWORDS:

        if keyword in text:
            matches.append(keyword)

    score = min(
        len(matches) * 3,
        10
    )

    return {
        "text": text,
        "matches": matches,
        "score": score
    }