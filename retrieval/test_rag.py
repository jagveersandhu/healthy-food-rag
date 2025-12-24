import os
import sys

# Add project root to Python path
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(PROJECT_ROOT)

from retrieval.rag_pipeline import RAGPipeline


def run_tests():
    rag = RAGPipeline(top_k=3)

    queries = [
        "What are the nutritions i can get by rolled oats and also what is recommended usage?"
    ]

    for q in queries:
        print("\n==============================")
        print("QUESTION:", q)
        print("==============================")
        answer = rag.generate_answer(q)
        print(answer)


if __name__ == "__main__":
    run_tests()
