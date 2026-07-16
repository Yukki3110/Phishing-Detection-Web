from datetime import datetime
def extract_field(field, target):

    if not field:
        return None

    for item in field:
        for key, value in item:
            if key == target:
                return value

    return None


def analyze_certificate(cert):

    if cert is None:
        return {
            "valid": False,
            "issuer": None,
            "subject": None,
            "expires": None
        }
        
    expires = cert.get("notAfter")

    try:
        expires = datetime.strptime(
            expires,
            "%b %d %H:%M:%S %Y %Z"
        ).strftime("%Y-%m-%d")

    except Exception:
        pass

    return {

        "valid": True,

        "issuer": extract_field(
            cert.get("issuer"),
            "organizationName"
        ),

        "subject": extract_field(
            cert.get("subject"),
            "commonName"
        ),

        "expires": expires
    }