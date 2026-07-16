import requests

from bs4 import BeautifulSoup

from urllib.parse import (
    urlparse
)


# =================================
# Download HTML
# =================================

def fetch_html(url):

    try:

        headers = {

            "User-Agent":
                "Mozilla/5.0"
        }

        response = requests.get(

            url,

            headers=headers,

            timeout=5,

            allow_redirects=True
        )

        return {

            "html": response.text,

            "redirect_count":
                len(response.history)
        }

    except Exception:

        return {

            "html": "",

            "redirect_count": 0
        }


# =================================
# Feature Vector
# =================================

def extract_content_features(url):

    response = fetch_html(
        url
    )

    html = response["html"]

    redirect_count = response[
        "redirect_count"
    ]

    if not html:

        return {

            "forms": 0,

            "inputs": 0,

            "iframes": 0,

            "scripts": 0,

            "images": 0,

            "css_files": 0,

            "line_count": 0,

            "largest_line_length": 0,

            "external_links": 0,

            "login_form": 0,

            "has_title": 0,

            "has_description": 0,

            "has_favicon": 0,

            "has_submit_button": 0,

            "has_hidden_fields": 0,

            "redirect_count": redirect_count
        }

    soup = BeautifulSoup(

        html,

        "html.parser"
    )

    # =================================
    # Basic Counts
    # =================================

    forms = len(
        soup.find_all("form")
    )

    inputs = len(
        soup.find_all("input")
    )

    iframes = len(
        soup.find_all("iframe")
    )

    scripts = len(
        soup.find_all("script")
    )
    
    images = len(

            soup.find_all("img")
        )

    css_files = len(

        soup.find_all(

            "link",

            rel="stylesheet"
        )
    )

    line_count = len(

        html.splitlines()
    )

    largest_line_length = max(

        (

            len(line)

            for line

            in html.splitlines()

        ),

        default=0
    )

    # =================================
    # Login Form Detection
    # =================================

    login_form = int(

        soup.find(

            "input",

            {"type": "password"}

        )

        is not None
    )
    # =================================
    # Submit Button Detection
    # =================================

    has_submit_button = int(

        soup.find(

            "input",

            {

                "type": "submit"

            }

        )

        is not None
    )
    
    # =================================
    # Hidden Fields Detection
    # =================================

    has_hidden_fields = int(

        soup.find(

            "input",

            {

                "type": "hidden"

            }

        )

        is not None
    )

    # =================================
    # Title Detection
    # =================================

    has_title = int(

        soup.title is not None

        and

        soup.title.string is not None

        and

        soup.title.string.strip() != ""
    )
    
    # =================================
    # Description Detection
    # =================================

    description = soup.find(

        "meta",

        attrs={

            "name": "description"
        }
    )

    has_description = int(

        description is not None
    )

    # =================================
    # Favicon Detection
    # =================================

    favicon = soup.find(

        "link",

        rel=lambda x:
            x and "icon" in str(x).lower()
    )

    has_favicon = int(
        favicon is not None
    )

    # =================================
    # External Links
    # =================================

    external_links = 0

    current_domain = urlparse(
        url
    ).netloc

    links = soup.find_all(

        "a",

        href=True
    )

    for link in links:

        href = link["href"]

        parsed = urlparse(
            href
        )

        # absolute url

        if parsed.netloc:

            if parsed.netloc != current_domain:

                external_links += 1

    # =================================
    # Final Feature Vector
    # =================================

    return {

        "forms":
            forms,

        "inputs":
            inputs,

        "iframes":
            iframes,

        "scripts":
            scripts,

        "images":
            images,

        "css_files":
            css_files,

        "line_count":
            line_count,

        "largest_line_length":
            largest_line_length,

        "external_links":
            external_links,

        "login_form":
            login_form,

        "has_title":
            has_title,

        "has_description":
            has_description,

        "has_favicon":
            has_favicon,

        "has_submit_button":
            has_submit_button,

        "has_hidden_fields":
            has_hidden_fields,

        "redirect_count":
            redirect_count
    }