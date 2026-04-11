from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from backend.domain.schemas import ChatRequest, ChatResponse
from backend.services.chat_service import ChatService

load_dotenv()

app = FastAPI(
    title="Chatbot — Daniel Fotografía",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

_chat_service = ChatService()


@app.get("/", response_class=HTMLResponse)
def frontend():
    html = Path("frontend/index.html").read_text(encoding="utf-8")
    return HTMLResponse(content=html)


@app.get("/portfolio", response_class=HTMLResponse)
def portfolio():
    html = Path("frontend/portfolio.html").read_text(encoding="utf-8")
    return HTMLResponse(content=html)


@app.get("/inquiry", response_class=HTMLResponse)
def inquiry():
    html = Path("frontend/inquiry.html").read_text(encoding="utf-8")
    return HTMLResponse(content=html)


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        return _chat_service.responder(request)
    except RuntimeError as e:
        print(f">>> ERROR: {str(e)}")
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        print(f">>> ERROR INESPERADO: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
