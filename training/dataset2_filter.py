from pathlib import Path
from PIL import Image
import easyocr
import numpy as np
import json

reader = easyocr.Reader(
    ['en'],
    gpu=True
)

DATASET_PATH = Path(
    "training/cleaned_dataset2"
)

PHISHING_DIR = DATASET_PATH / "phishing"
GENUINE_DIR = DATASET_PATH / "genuine"

ERROR_KEYWORDS = [
    "404",
    "not found",
    "page not found",
    "access denied",
    "error",
    "forbidden",
    "bad gateway",
    "service unavailable",
    "server error"
]


def get_images(folder):

    images = []

    for file in folder.iterdir():

        if file.suffix.lower() in [
            ".png",
            ".jpg",
            ".jpeg",
            ".webp"
        ]:
            images.append(file)

    return images


def is_blank_image(img):

    gray = np.array(
        img.convert("L")
    )

    std = gray.std()

    return std < 10


def detect_error_page(text):

    text = text.lower()

    for keyword in ERROR_KEYWORDS:

        if keyword in text:
            return True

    return False


def audit_folder(folder):

    suspicious = []

    images = get_images(folder)

    total = len(images)

    for idx, image_path in enumerate(images):

        try:

            img = Image.open(
                image_path
            )

            flags = []

            if is_blank_image(img):

                flags.append(
                    "blank_image"
                )

            results = reader.readtext(
                np.array(img)
            )

            text = " ".join(
                [r[1] for r in results]
            )

            if len(text.strip()) < 10:

                flags.append(
                    "very_low_text"
                )

            if detect_error_page(text):

                flags.append(
                    "error_page"
                )

            if flags:

                suspicious.append({

                    "file":
                        image_path.name,

                    "flags":
                        flags
                })

            if idx % 100 == 0:

                print(
                    f"{folder.name}: {idx}/{total}"
                )

        except Exception:

            continue

    return suspicious


report = {

    "phishing":
        audit_folder(
            PHISHING_DIR
        ),

    "genuine":
        audit_folder(
            GENUINE_DIR
        )
}

with open(
    "training/filter_report2.json",
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        report,
        f,
        indent=4
    )

print(
    "\nFilter report saved."
)