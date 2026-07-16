from pathlib import Path

DANGEROUS_EXTENSIONS = {

    ".exe",
    ".scr",
    ".bat",
    ".cmd",
    ".js",
    ".vbs",
    ".ps1",
    ".jar",
    ".iso",
    ".lnk"
}


def analyze_extension(filename):

    suffixes = Path(
        filename
    ).suffixes

    dangerous = any(
        ext.lower() in DANGEROUS_EXTENSIONS
        for ext in suffixes
    )

    double_extension = (
        len(suffixes) >= 2
    )

    score = 0

    if dangerous:
        score += 40

    if double_extension:
        score += 20

    return {

        "extensions": suffixes,

        "dangerous_extension":
            dangerous,

        "double_extension":
            double_extension,

        "score":
            score
    }