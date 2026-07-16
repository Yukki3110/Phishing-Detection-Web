def analyze_dns_records(records):
    """
    Analyze DNS records and detect suspicious patterns.
    """

    score = 0
    issues = []

    record_count = len(records)

    # No DNS records
    if record_count == 0:
        score += 30
        issues.append("No DNS A records found")

    # Too many A records (can indicate fast-flux hosting)
    elif record_count > 5:
        score += 10
        issues.append( "Large number of DNS records detected")

    return {

        "record_count": record_count,

        "issues": issues,

        "score": score
    }