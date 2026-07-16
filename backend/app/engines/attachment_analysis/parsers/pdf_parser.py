from pypdf import PdfReader


def parse_pdf(file_path):

    try:

        reader = PdfReader(
            str(file_path)
        )

        text = ""

        for page in reader.pages:

            extracted = page.extract_text()

            if extracted:
                text += extracted + "\n"

        return {

            "success": True,

            "pages": len(reader.pages),

            "text": text
        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e),

            "text": ""
        }