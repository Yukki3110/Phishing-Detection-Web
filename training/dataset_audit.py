from pathlib import Path
from PIL import Image
import imagehash
import easyocr
import numpy as np
import json

reader = easyocr.Reader(
    ['en'],
    gpu=False
)

DATASET_PATH = Path("C:\\Phishing-Detection-Web\\training\\dataset\\screenshots")
print(DATASET_PATH.resolve())

PHISHING_DIR = (DATASET_PATH / "phishing_site_1")

GENUINE_DIR = (DATASET_PATH / "genuine_site_0")

ERROR_KEYWORDS = [
    "404",
    "not found",
    "page not found",
    "server error",
    "forbidden",
    "access denied",
    "site can't be reached"
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


def check_blank_image(img):

    gray = img.convert("L")

    arr = np.array(gray)

    return arr.std() < 5


def detect_error_page(path):

    try:

        results = reader.readtext(
            str(path)
        )

        text = " ".join(
            [
                item[1]
                for item in results
            ]
        ).lower()

        return any(
            keyword in text
            for keyword in ERROR_KEYWORDS
        )

    except:
        return False


def audit_folder(folder):

    images = get_images(folder)

    resolutions = {}

    blank_images = 0

    error_pages = 0

    hashes = {}

    duplicates = 0

    for image_path in images:

        try:

            img = Image.open(
                image_path
            )

            # resolution

            size = (
                img.width,
                img.height
            )

            resolutions[size] = (
                resolutions.get(size, 0)
                + 1
            )

            # blank

            if check_blank_image(img):
                blank_images += 1

            # duplicate

            phash = str(
                imagehash.phash(img)
            )

            if phash in hashes:
                duplicates += 1
            else:
                hashes[phash] = image_path

            # error page

            if detect_error_page(
                image_path
            ):
                error_pages += 1

        except Exception:
            pass

    return {

        "total_images":
            len(images),

        "blank_images":
            blank_images,

        "error_pages":
            error_pages,

        "duplicates":
            duplicates,

        "resolutions":
            {
                str(k): v
                for k, v
                in resolutions.items()
            }
    }


if __name__ == "__main__":

    phishing_report = audit_folder(
        PHISHING_DIR
    )

    genuine_report = audit_folder(
        GENUINE_DIR
    )

    report = {

        "phishing":
            phishing_report,

        "genuine":
            genuine_report
    }

    print(
        json.dumps(
            report,
            indent=4
        )
    )

    with open(
        "dataset_report.json",
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            report,
            f,
            indent=4
        )