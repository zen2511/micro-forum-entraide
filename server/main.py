from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/questions")
def get_questions():
    return [
        {"id": 1, "title": "Comment utiliser useState ?"},
        {"id": 2, "title": "C'est quoi React Router ?"},
        {"id": 3, "title": "Pourquoi mon backend marche pas ?"}
    ]
@app.get("/")
def read_root():
    return {"message": "API en ligne"}