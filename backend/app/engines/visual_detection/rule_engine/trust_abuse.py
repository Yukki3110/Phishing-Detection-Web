from app.engines.visual_detection.ocr_loader import get_ocr_reader

TRUST_KEYWORDS = [

    "verified",
    "secure",
    "trusted",
    "official",
    "protected",
    "certified",

    "security center",
    "identity verification",

    "safe login",
    "secure login",

    "account protection",
    "security check",

    "verified account"
]


def detect_trust_abuse(image):
    
    reader = get_ocr_reader()

    results = reader.readtext(image)

    text = " ".join(
        [item[1] for item in results]
    ).lower()

    matches = []

    for keyword in TRUST_KEYWORDS:

        if keyword in text:
            matches.append(keyword)

    score = min(
        len(matches) * 2,
        8
    )

    return {

        "matches": matches,

        "score": score

    }