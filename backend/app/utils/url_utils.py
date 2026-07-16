from urllib.parse import (
    urlparse,
    unquote
)


def clean_url(url):

    if not url:
        return ""

    url = url.strip()

    url = unquote(url)

    if not url.startswith(
        ("http://", "https://")
    ):

        url = "http://" + url

    return url


def normalize_url(url):

    return clean_url(url).lower()


def extract_domain(url):

    url = clean_url(url)

    parsed = urlparse(url)

    return parsed.netloc.lower()

def extract_hostname(url):

    url = clean_url(url)

    parsed = urlparse(url)

    hostname = parsed.hostname

    if hostname:

        return hostname.lower()

    return ""