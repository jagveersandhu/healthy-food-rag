from typing import List, Dict
from pypdf import PdfReader


def load_pdf(pdf_path: str):
    """
    Loads a PDF file and returns its pages.
    """
    reader = PdfReader(pdf_path)
    return reader.pages


def extract_text_from_pages(pages) -> List[Dict]:
    """
    Extracts raw text from each page of the PDF.
    Returns a list of dictionaries with page number and text.
    """
    documents = []

    for page_number, page in enumerate(pages, start=1):
        text = page.extract_text()
        if text and text.strip():
            documents.append({
                "page_number": page_number,
                "text": text
            })

    return documents
