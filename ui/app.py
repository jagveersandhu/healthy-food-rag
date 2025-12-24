import os
import sys
import gradio as gr

# Add project root to Python path
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(PROJECT_ROOT)

from retrieval.rag_pipeline import RAGPipeline

# Initialize RAG once
rag = RAGPipeline(top_k=5)


def respond(message, history):
    """
    Gradio ChatInterface callback.
    history is managed internally by Gradio.
    """
    if not message or not message.strip():
        return ""

    try:
        return rag.generate_answer(message)
    except Exception:
        return "Sorry, something went wrong. Please try again."


with gr.Blocks() as app:

    # Header / branding
    gr.Markdown("### 🥗 Healthy Food Advisor")

    # Greeting
    gr.Markdown(
        """
        <div style="text-align:center; margin-top:40px;">
            <h2>Happy to have you back 👋</h2>
            <p>Ask your questions about healthy food and nutrition</p>
        </div>
        """
    )

    # ChatGPT-style chat interface
    gr.ChatInterface(
        fn=respond,
        textbox=gr.Textbox(
            placeholder="Ask your question here...",
            lines=1
        ),
        title=None,
        description=None
    )


if __name__ == "__main__":
    app.launch(
        css="""
        body {
            background-color: #0f0f0f;
        }
        """
    )
