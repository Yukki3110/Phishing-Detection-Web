from .unicode_normalizer import normalize_domain
from app.utils.url_utils import extract_hostname
from .spoof_detector import(
    calculate_spoof_risk
)

def analyze_domain(domain: str):
    
    hostname = extract_hostname(domain)

    normalized = normalize_domain(
        hostname
    )

    spoof_result = calculate_spoof_risk(
        normalized
    )

    return {
        
        "original_input": domain,
        
        "original_domain": hostname,

        "normalized_domain":
            normalized,

        **spoof_result
    }