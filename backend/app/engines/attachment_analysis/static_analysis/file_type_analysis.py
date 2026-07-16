import mimetypes
import os


def analyze_file_type(file_path):

    extension = file_path.suffix.lower()

    mime_type, _ = mimetypes.guess_type(
        str(file_path)
    )

    if mime_type is None:
        mime_type = "unknown"

    file_size = os.path.getsize(
        file_path
    )

    mismatch = False

    if extension == ".pdf":

        mismatch = (
            "pdf" not in mime_type
        )

    elif extension in [".doc", ".docx"]:

        mismatch = (
            "word" not in mime_type
            and
            "officedocument" not in mime_type
        )

    elif extension == ".txt":

        mismatch = (
            "text" not in mime_type
        )

    elif extension == ".zip":

        mismatch = (
            "zip" not in mime_type
        )

    score = 30 if mismatch else 0

    return {

        "mime_type":
            mime_type,

        "mime_mismatch":
            mismatch,

        "file_size_bytes":
            file_size,

        "score":
            score
    }