from pathlib import Path
from PIL import Image
import imagehash
import shutil


DATASET_PATH = Path("C:\\Phishing-Detection-Web\\training\\dataset\\screenshots")

OUTPUT_PATH = Path("training/cleaned_dataset")

PHISHING_DIR = DATASET_PATH / "phishing_site_1"
GENUINE_DIR = DATASET_PATH / "genuine_site_0"
print(PHISHING_DIR)
print(GENUINE_DIR)
print(OUTPUT_PATH)

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


def clean_folder(
    source_folder,
    target_folder
):

    target_folder.mkdir(
        parents=True,
        exist_ok=True
    )

    seen_hashes = set()

    total = 0
    kept = 0
    removed = 0

    for image_path in get_images(
        source_folder
    ):

        total += 1

        try:

            img = Image.open(
                image_path
            )

            phash = str(
                imagehash.phash(img)
            )

            if phash in seen_hashes:

                removed += 1
                continue

            seen_hashes.add(
                phash
            )

            shutil.copy2(
                image_path,
                target_folder /
                image_path.name
            )

            kept += 1

        except Exception:

            continue

    return {
        "total": total,
        "kept": kept,
        "removed": removed
    }


phishing_report = clean_folder(
    PHISHING_DIR,
    OUTPUT_PATH / "phishing"
)

genuine_report = clean_folder(
    GENUINE_DIR,
    OUTPUT_PATH / "genuine"
)

print("\n=== CLEANING REPORT ===\n")

print(
    "PHISHING:",
    phishing_report
)

print(
    "GENUINE:",
    genuine_report
)