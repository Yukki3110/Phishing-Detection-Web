from pathlib import Path


def load_confusables():

    mapping = {}

    file_path = Path(__file__).parent / "data" / "confusables.txt"

    with open(
        file_path,
        encoding="utf-8"
    ) as f:

        for line in f:

            line = line.strip()

            # Skip comments and empty lines

            if (
                not line
                or line.startswith("#")
            ):
                continue

            parts = line.split(";")

            if len(parts) < 2:
                continue

            source = parts[0].strip()

            target = parts[1].strip()

            try:

                source_char = chr(
                    int(source, 16)
                )

                target_chars = "".join(

                    chr(int(x, 16))

                    for x in target.split()
                )

                mapping[source_char] = target_chars

            except Exception:
                continue

    return mapping


CONFUSABLE_MAP = load_confusables()