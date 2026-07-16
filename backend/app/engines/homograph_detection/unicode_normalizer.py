import unicodedata

def normalize_domain(domain: str):
    
    return unicodedata.normalize(
        "NFKC", domain
    )