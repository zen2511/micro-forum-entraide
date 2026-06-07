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
@app.get("/api/questions/{question_id}")
def get_question(question_id: int):
    questions = [
        {"id": 1, "title": "Comment utiliser useState ?"},
        {"id": 2, "title": "C'est quoi React Router ?"},
        {"id": 3, "title": "Pourquoi mon backend marche pas ?"}
    ]
    
    for q in questions:
        if q["id"] == question_id:
            return q
    
    return {"detail": "Not Found"}, 404

answers_db = [
    {"id": 1, "question_id": 2, "content": "React Router sert à naviguer entre pages sans recharger"},
    {"id": 2, "question_id": 2, "content": "C'est une librairie pour le routing côté client"}
]

@app.get("/api/questions/{question_id}/answers")
def get_answers(question_id: int):
    return [a for a in answers_db if a["question_id"] == question_id]

@app.post("/api/questions/{question_id}/answers")
def create_answer(question_id: int, answer: dict):
    new_id = len(answers_db) + 1
    new_answer = {
        "id": new_id,
        "question_id": question_id,
        "content": answer["content"]
    }
    answers_db.append(new_answer)
    return new_answer