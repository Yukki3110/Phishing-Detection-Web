import dns.resolver

def get_dns_records(domain):
    
    try:
        
        answers = dns.resolver.resolve(domain, 'A')
        
        return [r.to_text() for r in answers]
    
    except Exception:
        
        return []