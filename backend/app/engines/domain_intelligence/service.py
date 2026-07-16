from .whois.whois_lookup import get_domain_age
from .dns.dns_lookup import get_dns_records
from .dns.dns_records import analyze_dns_records

from .ssl.ssl_checker import get_ssl_certificate
from .ssl.certified_analysis import analyze_certificate

from .reputation.reputation_score import calculate_reputation_score
from datetime import datetime
def analyze_domain(domain):
    
    age = get_domain_age(domain)
    
    display_age = age

    if isinstance(age, datetime):

        display_age = age.strftime(
        "%Y-%m-%d"
    )
    
    dns_records = get_dns_records(domain)
    
    dns_analysis = analyze_dns_records(dns_records)
    
    cert = get_ssl_certificate(domain)
    
    ssl_info = analyze_certificate(cert)
    
    reputation = calculate_reputation_score(
        age,
        ssl_info,
        dns_analysis
    )
    return {

        "creation_date": display_age,

        "dns_records": dns_records,

        "dns_analysis": dns_analysis,

        "ssl_info": ssl_info,

        "reputation": reputation
    }