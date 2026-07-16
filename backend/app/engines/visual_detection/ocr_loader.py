import easyocr

_reader = None

def get_ocr_reader():

    global _reader

    if _reader is None:

        _reader = easyocr.Reader(
            ['en'],
            gpu=False
        )

    return _reader