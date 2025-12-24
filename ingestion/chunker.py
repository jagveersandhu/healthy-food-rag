import re
from typing import List, Dict


def normalize_text(text: str) -> str:
    """
    Normalizes spacing and formatting artifacts.
    """
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def chunk_text(
    text: str,
    chunk_size: int = 500,
    overlap: int = 100
) -> List[str]:
    """
    Splits text into overlapping chunks based on word count.
    """
    words = text.split()
    chunks = []

    start = 0
    total_words = len(words)

    while start < total_words:
        end = start + chunk_size
        chunk_words = words[start:end]
        chunk = " ".join(chunk_words)
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks


def create_chunks_with_metadata(documents: List[Dict]) -> List[Dict]:
    """
    Creates chunks with metadata from extracted PDF documents.
    """
    all_chunks = []

    for doc in documents:
        normalized_text = normalize_text(doc["text"])
        chunks = chunk_text(normalized_text)

        for idx, chunk in enumerate(chunks):
            all_chunks.append({
                "content": chunk,
                "metadata": {
                    "page_number": doc["page_number"],
                    "chunk_index": idx
                }
            })

    return all_chunks
