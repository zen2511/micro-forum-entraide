import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/questions/${id}`)
     .then((res) => {
        if (!res.ok) throw new Error("Question introuvable");
        return res.json();
      })
     .then((data) => {
        setQuestion(data);
        setLoading(false);
      })
     .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{question.title}</h1>
      <p>{question.content}</p>
    </div>
  );
}

export default QuestionDetail;