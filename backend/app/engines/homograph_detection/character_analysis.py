import unicodedata
from .confusable_loader import CONFUSABLE_MAP


def detect_scripts(text: str):

    scripts = set()

    for char in text:

        try:

            name = unicodedata.name(char)

            if "LATIN" in name:
                scripts.add("LATIN")

            elif "GREEK" in name:
                scripts.add("GREEK")

            elif "CYRILLIC" in name:
                scripts.add("CYRILLIC")

        except ValueError:
            continue

    return list(scripts)

def has_mixed_scripts(text: str):

    scripts = detect_scripts(text)

    return len(scripts) > 1



def count_confusable_characters(text: str):

    count = 0

    found = []

    for char in text:
        
        if ord(char) < 128:
            continue

        if char in CONFUSABLE_MAP:

            count += 1
            found.append({

                "character": char,

                "looks_like":
                    CONFUSABLE_MAP[char]

            })

    return {

        "count": count,
        "characters": found
    }