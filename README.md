# Healthy Food Product Advisor (RAG System)

A production-ready Retrieval-Augmented Generation (RAG) system that answers user queries about healthy food products using a structured PDF as the knowledge source. The system provides factual, document-grounded responses while presenting nutritional benefits in a value-driven, ethical, and customer-friendly manner.

---

## Overview

This project implements a deterministic, non-agentic RAG pipeline designed for reliability, explainability, and controlled behavior. The system focuses on answering product-specific nutrition questions using only the provided document data, while subtly helping users make sensible inclusion or purchase decisions without exaggeration or medical claims.

---

## Key Features

- Product-aware PDF ingestion  
- Semantic search using FAISS vector database  
- Deterministic RAG pipeline (no agentic behavior)  
- Local LLM inference using Ollama (LLaMA 3.1 8B)  
- Strict document grounding (no hallucinations)  
- Ethical, value-driven response framing  
- ChatGPT-style interactive UI built with Gradio  

---

## System Architecture (High Level)

1. **PDF Ingestion**  
   The source PDF is parsed, cleaned, and chunked deterministically at a product-aware level.

2. **Embeddings and Vector Store**  
   Text chunks are embedded using Sentence-Transformers and stored in a FAISS vector index for fast semantic retrieval.

3. **Retrieval-Augmented Generation**  
   Relevant chunks are retrieved deterministically and injected into a controlled prompt template.

4. **LLM Layer**  
   A local Ollama instance running LLaMA 3.1 8B generates concise, grounded responses using conservative generation settings.

5. **Frontend UI**  
   A Gradio-based chat interface provides a clean, fast, and intuitive user experience.

---

## Prerequisites

- Python **3.10 or higher**
- Ollama installed and available in PATH  
  https://ollama.com

---

## Environment Setup

### Step 1: Clone the Repository

git clone <your-github-repo-url>
cd healthy-food-rag

### Step 2: Create and Activate Virtual Environment

- python -m venv venv
- .venv\Scripts\activate

### Step 3: Install Python Dependencies

pip install -r requirements.txt

### Ollama Setup (LLM)

### Step 4: Start Ollama Service

- ollama serve
- ollama pull llama3.1:8b

### Data Ingestion Pipeline

### Step 6: Add the Source PDF

healthy_food_products.pdf

### Step 7: Run PDF Ingestion

- python ingestion/run_ingestion.py

### This step:
- Parses the PDF
- Cleans and normalizes text
- Creates deterministic product-aware chunks

### Step 8: Generate Embeddings and Build Vector Store

- python embeddings/build_index.py

### This step:
- Generates embeddings for all chunks
- Builds a FAISS index
- Persists the vector database locally

### Step 9: Test Semantic Retrieval (Optional)

- python embeddings/test_search.py
- Use this step to confirm that relevant chunks are being retrieved correctly before running the UI.

### Running the Gradio UI

### Step 10: Launch the User Interface

python ui/app.py

### Open the application in your browser:
- Users can now ask product-specific nutrition questions
- Receive concise, document-grounded, and value-focused responses

---

### Performance Notes
- CPU-only systems may take 2–5 minutes per response for LLaMA 3.1 8B
- GPU-enabled systems typically respond in 5–10 seconds
- Prompt optimization significantly improves both latency and answer quality

---

### Design Principles
- Deterministic behavior (no autonomous agents)
- Strict grounding to source document
- Ethical, non-exaggerated persuasion
- Clear separation of data, retrieval, prompting, and UI
- Production-oriented structure and discipline

---

### License
- This project is intended for educational, research, and demonstration purposes.

---

### Final Note
- This repository represents a real-world RAG application, not a tutorial prototype.
- The architecture, prompt discipline, and UI design follow production-grade best practices focused on reliability, clarity, and user trust.
