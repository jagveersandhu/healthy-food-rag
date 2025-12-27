import os
import sys
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. Setup paths so we can find your RAG folders
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "."))
sys.path.append(PROJECT_ROOT)

from retrieval.rag_pipeline import RAGPipeline

# 2. Initialize the backend
app = FastAPI()

# Enable CORS so your React app (port 5173) can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG once when the server starts
rag = RAGPipeline(top_k=5)

# Define the data shape for incoming requests
class UserQuery(BaseModel):
    text: str

@app.post("/query")
async def handle_query(query: UserQuery):
    if not query.text or not query.text.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    try:
        # 3. Using your existing RAG logic to get the real answer!
        answer = rag.generate_answer(query.text)
        return {"answer": answer}
    except Exception as e:
        print(f"RAG Error: {e}")
        return {"answer": "Sorry, I encountered an error while searching for nutrition data."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)