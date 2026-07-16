from pathlib import Path


from app.engines.attachment_analysis.parsers.pdf_parser import parse_pdf

from app.engines.attachment_analysis.parsers.docx_parser import parse_docx

from app.engines.attachment_analysis.parsers.text_parser import parse_text
from app.engines.attachment_analysis.parsers.zip_parser import parse_zip

from app.engines.attachment_analysis.extraction.url_extractor import extract_urls

from app.engines.attachment_analysis.static_analysis.file_type_analysis import analyze_file_type

from app.engines.attachment_analysis.static_analysis.suspicious_extension import analyze_extension


from app.engines.attachment_analysis.static_analysis.macro_detection import detect_macros


from app.engines.attachment_analysis.scoring.attachment_risk import calculate_attachment_risk


from app.engines.url_detection.service import analyze_url



def analyze_attachment(file_path):

    file_path = Path(file_path)

    extension = file_path.suffix.lower()

    # =================================
    # Static Analysis
    # =================================

    mime_result = analyze_file_type(
        file_path
    )

    extension_result = analyze_extension(
        file_path
    )

    macro_result = detect_macros(
        file_path
    )

    # =================================
    # Parse File
    # =================================

    parsed_result = {

        "text": "",
        "score": 0
    }

    if extension == ".pdf":

        parsed_result = parse_pdf(
            file_path
        )

    elif extension in [".docx", ".doc"]:

        parsed_result = parse_docx(
            file_path
        )

    elif extension == ".txt":

        parsed_result = parse_text(
            file_path
        )

    elif extension == ".zip":

        parsed_result = parse_zip(
            file_path
        )

    extracted_text = parsed_result.get(
        "text",
        ""
    )

    # =================================
    # URL Extraction
    # =================================

    extracted_urls = extract_urls(
        extracted_text
    )

    # =================================
    # URL Analysis
    # =================================

    url_analysis = []

    for url in extracted_urls:

        try:

            result = analyze_url(
                url
            )

            url_analysis.append({

                "url": url,

                "prediction": result["prediction"],

                "risk_score": result["risk_score"],

                "risk_level": result["risk_level"],

                "reputation":
                    result["domain_info"]["reputation"]
                        })

        except Exception as e:

            url_analysis.append({

                "url": url,

                "error": str(e)
            })

    # =================================
    # Risk Scoring
    # =================================

    risk_result = calculate_attachment_risk(

        extension_result,

        mime_result,

        macro_result,

        url_analysis
    )

    # =================================
    # Final Response
    # =================================

    return {

        "file_type_analysis":
            mime_result,

        "extension_analysis":
            extension_result,

        "macro_analysis":
            macro_result,

        "parser_result":  {

            "success":
                parsed_result.get(
                    "success",
                    True
                ),

            "preview":

                parsed_result.get(
                    "text",
                    ""
                )[:500]

        },

        "extracted_urls":
            extracted_urls,

        "url_analysis":
            url_analysis,

        "risk_result":
            risk_result
    }