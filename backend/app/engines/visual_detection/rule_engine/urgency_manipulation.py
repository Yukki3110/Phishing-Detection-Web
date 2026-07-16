from app.engines.visual_detection.ocr_loader import get_ocr_reader

URGENCY_KEYWORDS = [
    "verify now",
    "verify immediately",
    "account suspended",
    "account locked",
    "security alert",
    "action required",
    "urgent",
    "immediately",
    "your account will be closed",
    "confirm your identity"
]


def detect_urgency_manipulation(image):
    
    reader = get_ocr_reader()

    results = reader.readtext(image)

    text = " ".join(
        [item[1] for item in results]
    ).lower()

    matches = []

    for keyword in URGENCY_KEYWORDS:

        if keyword in text:
            matches.append(keyword)

    score = min(
        len(matches) * 4,
        15
    )

    return {
        "matches": matches,
        "score": score
    }