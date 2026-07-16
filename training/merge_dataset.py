from pathlib import Path
import shutil


# ==================================================
# PATHS
# ==================================================

DATASET1 = Path(
    "training/cleaned_dataset"
)

DATASET2 = Path(
    "training/cleaned_dataset2"
)

OUTPUT_PATH = Path(
    "training/merged_dataset"
)


# ==================================================
# MERGE FUNCTION
# ==================================================

def merge_class(
    source_folder,
    target_folder,
    start_index=0
):

    target_folder.mkdir(
        parents=True,
        exist_ok=True
    )

    count = start_index

    images = []

    for ext in [
        "*.png",
        "*.jpg",
        "*.jpeg",
        "*.webp"
    ]:

        images.extend(
            source_folder.glob(ext)
        )

    total = len(images)

    for idx, image_path in enumerate(images):

        new_name = (
            f"{count:06d}"
            f"{image_path.suffix.lower()}"
        )

        shutil.copy2(
            image_path,
            target_folder / new_name
        )

        count += 1

        if idx % 100 == 0:

            print(
                f"{source_folder.name}: "
                f"{idx}/{total}"
            )

    return count


# ==================================================
# MERGE PHISHING
# ==================================================

print("\nMerging phishing images...\n")

counter = 0

counter = merge_class(
    DATASET1 / "phishing",
    OUTPUT_PATH / "phishing",
    counter
)

counter = merge_class(
    DATASET2 / "phishing",
    OUTPUT_PATH / "phishing",
    counter
)

phishing_total = counter


# ==================================================
# MERGE GENUINE
# ==================================================

print("\nMerging genuine images...\n")

counter = 0

counter = merge_class(
    DATASET1 / "genuine",
    OUTPUT_PATH / "genuine",
    counter
)

counter = merge_class(
    DATASET2 / "genuine",
    OUTPUT_PATH / "genuine",
    counter
)

genuine_total = counter


# ==================================================
# REPORT
# ==================================================

print("\n=== MERGE REPORT ===\n")

print(
    f"Phishing Images: {phishing_total}"
)

print(
    f"Genuine Images: {genuine_total}"
)

print(
    f"Total Images: "
    f"{phishing_total + genuine_total}"
)