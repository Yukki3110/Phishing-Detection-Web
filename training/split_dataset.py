from pathlib import Path
from sklearn.model_selection import train_test_split
import shutil

SOURCE_DIR = Path(
    "training/merged_dataset"
)

OUTPUT_DIR = Path(
    "training/dataset"
)

PHISHING_DIR = SOURCE_DIR / "phishing"
GENUINE_DIR = SOURCE_DIR / "genuine"


def get_images(folder):

    return [

        file

        for file in folder.iterdir()

        if file.suffix.lower() in [
            ".png",
            ".jpg",
            ".jpeg",
            ".webp"
        ]
    ]


def split_class(
    image_paths,
    class_name
):

    train_files, temp_files = train_test_split(

        image_paths,

        test_size=0.30,

        random_state=42

    )

    val_files, test_files = train_test_split(

        temp_files,

        test_size=0.50,

        random_state=42

    )

    splits = {

        "train": train_files,

        "val": val_files,

        "test": test_files

    }

    for split_name, files in splits.items():

        target_dir = (

            OUTPUT_DIR
            / split_name
            / class_name
        )

        target_dir.mkdir(
            parents=True,
            exist_ok=True
        )

        for file in files:

            shutil.copy2(

                file,

                target_dir / file.name

            )

    return {

        "train": len(train_files),

        "val": len(val_files),

        "test": len(test_files)

    }


def main():

    # Xóa dataset split cũ
    if OUTPUT_DIR.exists():

        shutil.rmtree(
            OUTPUT_DIR
        )

        print(
            "Old split dataset removed."
        )

    phishing_images = get_images(
        PHISHING_DIR
    )

    genuine_images = get_images(
        GENUINE_DIR
    )

    phishing_stats = split_class(

        phishing_images,

        "phishing"

    )

    genuine_stats = split_class(

        genuine_images,

        "genuine"

    )

    print("\n=== SPLIT REPORT ===\n")

    print(

        "PHISHING:",

        phishing_stats

    )

    print(

        "GENUINE:",

        genuine_stats

    )


if __name__ == "__main__":

    main()