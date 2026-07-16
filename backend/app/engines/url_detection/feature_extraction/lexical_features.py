import re
import math
from collections import Counter
from urllib.parse import urlparse


# =================================
# Basic Features
# =================================

def url_length(url):
    return len(url)


def count_dots(url):
    return url.count(".")


def contains_ip(url):

    pattern = r'\d+\.\d+\.\d+\.\d+'

    return bool(
        re.search(pattern, url)
    )


# =================================
# Structural Features
# =================================

def count_digits(url):

    return sum(
        c.isdigit()
        for c in url
    )
    
# =================================
# Digit Ratio
# =================================

def digit_ratio(url):

    if len(url) == 0:

        return 0

    return round(

        count_digits(url) / len(url),

        4
    )
    
# =================================
# Letter Features
# =================================

def count_letters(url):

    return sum(

        c.isalpha()

        for c in url
    )


def letter_ratio(url):

    if len(url) == 0:

        return 0

    return round(

        count_letters(url) / len(url),

        4
    )


def count_hyphens(url):

    return url.count("-")


def count_slashes(url):

    return url.count("/")


def count_subdomains(url):

    try:

        domain = urlparse(url).netloc

        return max(
            len(domain.split(".")) - 2,
            0
        )

    except:

        return 0


def hostname_length(url):

    try:

        return len(
            urlparse(url).netloc
        )

    except:

        return 0
    
# =================================
# Domain Length
# =================================

def domain_length(url):

    try:

        return len(

            urlparse(url).netloc

        )

    except:

        return 0


def path_length(url):

    try:

        return len(
            urlparse(url).path
        )

    except:

        return 0


def query_length(url):

    try:

        return len(
            urlparse(url).query
        )

    except:

        return 0


# =================================
# Binary Features
# =================================

def has_https(url):

    return int(
        url.startswith("https://")
    )


def has_at_symbol(url):

    return int(
        "@" in url
    )


def has_double_slash_redirect(url):

    # Ignore protocol

    pos = url.find("//")

    if pos == -1:

        return 0

    remaining = url[pos + 2:]

    return int(
        "//" in remaining
    )


# =================================
# Suspicious Keywords
# =================================

SUSPICIOUS_WORDS = [

    "login",

    "signin",

    "verify",

    "secure",

    "update",

    "account",

    "confirm",

    "bank",

    "paypal",

    "password",

    "webscr",

    "ebayisapi"

]


def count_suspicious_words(url):

    url = url.lower()

    count = 0

    for word in SUSPICIOUS_WORDS:

        if word in url:

            count += 1

    return count


# =================================
# Special Character Features
# =================================

SPECIAL_CHARS = [

    "@",

    "?",

    "=",

    "&",

    "%",

    "_",

    "~"

]

# =================================
# Character Counters
# =================================

def count_equals(url):

    return url.count("=")


def count_question_marks(url):

    return url.count("?")


def count_ampersands(url):

    return url.count("&")


def count_special_characters(url):

    return sum(

        url.count(char)

        for char in SPECIAL_CHARS
    )

# =================================
# Special Character Ratio
# =================================

def special_char_ratio(url):

    if len(url) == 0:

        return 0

    return round(

        count_special_characters(url)

        / len(url),

        4
    )

# =================================
# Entropy
# =================================

def url_entropy(url):

    if not url:

        return 0

    counter = Counter(url)

    probabilities = [

        count / len(url)

        for count in counter.values()
    ]

    entropy = -sum(

        p * math.log2(p)

        for p in probabilities
    )

    return round(
        entropy,
        4
    )
# =================================
# Punny
# =================================

def has_punycode(url):

    return int(
        "xn--" in url.lower()
    )

# =================================
# Count hyphens
# =================================
def count_consecutive_hyphens(url):

    matches = re.findall(
        r"-{2,}",
        url
    )

    return len(matches)

# =================================
# Longest token
# =================================
def longest_token_length(url):

    tokens = re.split(
        r"[./?=&_-]",
        url
    )

    tokens = [

        token

        for token in tokens

        if token
    ]

    if not tokens:

        return 0

    return max(

        len(token)

        for token in tokens
    )