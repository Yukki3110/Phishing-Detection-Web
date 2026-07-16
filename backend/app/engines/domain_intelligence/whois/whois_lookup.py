import whois

def get_domain_age(domain):

    try:

        data = whois.whois(domain)

        creation_date = data.creation_date

        if isinstance(creation_date, list):
            creation_date = creation_date[0]


        return creation_date

    except Exception:

        return None