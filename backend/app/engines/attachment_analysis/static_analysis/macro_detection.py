from pathlib import Path

from oletools.olevba import VBA_Parser


def detect_macros(file_path):

    file_path = Path(file_path)

    suffix = file_path.suffix.lower()

    # ======================
    # Macro-enabled extension
    # ======================

    macro_extensions = [

        ".docm",
        ".xlsm",
        ".pptm"

    ]

    if suffix in macro_extensions:

        return {

            "macros_found": True,

            "macro_type": "macro_enabled_extension",

            "score": 40
        }

    # ======================
    # Scan VBA code
    # ======================

    try:

        parser = VBA_Parser(

            str(file_path)
        )

        has_macros = parser.detect_vba_macros()

        if has_macros:

            suspicious_keywords = [

                "AutoOpen",
                "AutoExec",
                "Shell",
                "CreateObject",
                "WScript",
                "PowerShell"
            ]

            found_keywords = []

            for (

                _,
                _,
                _,
                code

            ) in parser.extract_macros():

                for keyword in suspicious_keywords:

                    if keyword.lower() in code.lower():

                        found_keywords.append(
                            keyword
                        )

            parser.close()

            return {

                "macros_found": True,

                "keywords": list(
                    set(found_keywords)
                ),

                "score": 50
            }

        parser.close()

        return {

            "macros_found": False,

            "score": 0
        }

    except Exception as e:

        return {

            "macros_found": False,

            "error": str(e),

            "score": 0
        }