import re

URL_PATTERN = re.compile(

    r"(https?://[^\s\"\'<>]+|www\.[^\s\"\'<>]+)",

    re.IGNORECASE
)


def extract_urls(text):

    if not text:

        return []

    matches = URL_PATTERN.findall(
        text
    )

    cleaned_urls = []

    for url in matches:

        url = url.strip()

        url = url.rstrip(
            ".,;:!?)]}"
        )

        if url not in cleaned_urls:

            cleaned_urls.append(
                url
            )

    return cleaned_urls