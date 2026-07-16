import zipfile


def parse_zip(file_path):
    """
    Extract text information and file list
    from ZIP archives.
    """

    extracted_text = []

    contained_files = []

    suspicious_files = []

    try:

        with zipfile.ZipFile(
            file_path,
            "r"
        ) as zip_ref:

            file_list = zip_ref.namelist()

            contained_files = file_list

            for filename in file_list:

                lower_name = filename.lower()

                # Detect potentially dangerous files

                if lower_name.endswith(

                    (
                        ".exe",
                        ".bat",
                        ".cmd",
                        ".js",
                        ".vbs",
                        ".ps1",
                        ".scr",
                        ".msi"
                    )

                ):

                    suspicious_files.append(
                        filename
                    )

                # Read text-based files only

                if lower_name.endswith(

                    (
                        ".txt",
                        ".html",
                        ".htm",
                        ".csv"
                    )

                ):

                    try:

                        with zip_ref.open(
                            filename
                        ) as f:

                            content = f.read()

                            extracted_text.append(

                                content.decode(
                                    "utf-8",
                                    errors="ignore"
                                )

                            )

                    except Exception:

                        continue

        return {

            "contained_files":
                contained_files,

            "suspicious_files":
                suspicious_files,

            "text":

                "\n".join(
                    extracted_text
                ),

            "score":

                len(
                    suspicious_files
                ) * 15
        }

    except Exception as e:

        return {

            "contained_files": [],

            "suspicious_files": [],

            "text": "",

            "score": 0,

            "error": str(e)
        }