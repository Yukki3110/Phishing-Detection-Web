from docx import Document


def parse_docx(file_path):

    try:

        document = Document(
            str(file_path)
        )

        text = "\n".join(

            paragraph.text

            for paragraph in document.paragraphs
        )

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