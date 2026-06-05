import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// 1. Mets fetchQuestion en dehors du composant
export const fetchQuestion = async (id, setQuestion) => {
  // Mock data pour l'instant
  setQuestion({
    id: id,
    title: `Question ${id}`,
    content: "Contenu de la question ici",
    answers: ["Réponse 1", "Réponse 2", "Réponse 3"]
  })
}

export default function QuestionDetail() {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)

  useEffect(() => {
    fetchQuestion(id, setQuestion)
  }, [id])

  if (!question) return <p>Chargement...</p>

  return (
    <div>
      <h2>{question.title}</h2>
      <p>{question.content}</p>

      <h3>Réponses</h3>
      <ul>
        {question.answers.map((ans, i) => (
          <li key={i}>{ans}</li>
        ))}
      </ul>
    </div>
  )
}