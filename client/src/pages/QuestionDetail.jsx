import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charge la question
    fetch(`http://localhost:8000/api/questions/${id}`)
     .then(res => res.json())
     .then(data => setQuestion(data));

    // Charge les réponses
    fetch(`http://localhost:8000/api/questions/${id}/answers`)
     .then(res => res.json())
     .then(data => {
        setAnswers(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    fetch(`http://localhost:8000/api/questions/${id}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newAnswer })
    })
   .then(res => res.json())
   .then(answer => {
      setAnswers([...answers, answer]);
      setNewAnswer("");
    });
  };

  if (loading) return <p>Chargement...</p>;
if (!question) return <p>Question introuvable</p>;

return (
  <div style={{ padding: "20px", maxWidth: "700px" }}>
    <h1>{question.title}</h1>
    <p>{question.content}</p>

    <hr style={{ margin: "30px 0" }} />

    <h3>Réponses ({answers.length})</h3>
    {answers.length === 0? (
      <p>Aucune réponse pour l'instant</p>
    ) : (
      answers.map(a => (
        <div key={a.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          {a.content}
        </div>
      ))
    )}

    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h4>Ton réponse</h4>
      <textarea
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
        rows="4"
        style={{ width: "100%", padding: "8px" }}
        placeholder="Écris ta réponse ici..."
      />
      <button type="submit" style={{ marginTop: "10px", padding: "8px 16px" }}>
        Envoyer
      </button>
    </form>
  </div>
);
  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "700px" }}>
      <h1>{question.title}</h1>
      <p>{question.content}</p>

      <hr style={{ margin: "30px 0" }} />

      <h3>Réponses ({answers.length})</h3>
      {answers.length === 0? (
        <p>Aucune réponse pour l'instant</p>
      ) : (
        answers.map(a => (
          <div key={a.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            {a.content}
          </div>
        ))
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <h4>Ton réponse</h4>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          rows="4"
          style={{ width: "100%", padding: "8px" }}
          placeholder="Écris ta réponse ici..."
        />
        <button type="submit" style={{ marginTop: "10px", padding: "8px 16px" }}>
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default QuestionDetail;