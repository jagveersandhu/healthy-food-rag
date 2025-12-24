from pdf_loader import load_pdf, extract_text_from_pages
from chunker import create_chunks_with_metadata

PDF_PATH = "data/healthy_food_products.pdf"


def run_ingestion():
    """
    Runs the full PDF ingestion pipeline.
    """
    pages = load_pdf(PDF_PATH)
    documents = extract_text_from_pages(pages)
    chunks = create_chunks_with_metadata(documents)
    return chunks


if __name__ == "__main__":
    chunks = run_ingestion()

    print(f"PDF ingestion completed successfully.")
    print(f"Total chunks created: {len(chunks)}")

    # Preview first 2 chunks for validation
    for i in range(min(2, len(chunks))):
        print("\n--- Chunk Preview ---")
        print(f"Page: {chunks[i]['metadata']['page_number']}")
        print(f"Chunk Index: {chunks[i]['metadata']['chunk_index']}")
        print(chunks[i]['content'][:500])
