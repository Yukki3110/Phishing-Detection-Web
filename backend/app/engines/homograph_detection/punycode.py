import idna


def detect_punycode(domain: str):

    return (

        domain.startswith("xn--")

        or

        ".xn--" in domain

        or

        "xn--" in domain

    )


def decode_punycode(domain: str):

    try:

        return idna.decode(domain)

    except Exception:

        return domain