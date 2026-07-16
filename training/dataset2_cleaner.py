from pathlib import Path
from PIL import Image
import imagehash
import shutil


DATASET_PATH = Path("C:\\Phishing-Detection-Web\\training\\dataset")

OUTPUT_PATH = Path("training/cleaned_dataset2")

PHISHING_DIR = DATASET_PATH / "phishing ss"
GENUINE_DIR = DATASET_PATH / "legit ss"
print(PHISHING_DIR)
print(GENUINE_DIR)
print(OUTPUT_PATH)

def get_images(folder):

    images = []

    for ext in [
        "*.png",
        "*.jpg",
        "*.jpeg",
        "*.webp"
    ]:

        images.extend(
            folder.rglob(ext)
        )

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

    images = get_images(
        source_folder
    )

    total_images = len(images)

    for idx, image_path in enumerate(images):

        if idx % 100 == 0:

            print(
                f"{source_folder.name}: "
                f"{idx}/{total_images}"
            )

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

            new_name = (
                f"{kept:06d}.png"
            )

            img.save(
                target_folder / new_name
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