def parse_text(file_path):

    try:

        with open(
            file_path,
            "r",
            encoding="utf-8",
            errors="ignore"
        ) as f:

            text = f.read()

        return {

            "success": True,

            "text": text
        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e),

            "text": ""
        }