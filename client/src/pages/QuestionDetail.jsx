import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AnswerForm from '../components/AnswerForm'
function QuestionDetail() {
const { id } = useParams() // Extrait l'ID depuis /question/:id
const [question, setQuestion] = useState(null)
// Une seule requete : les reponses sont dans question.answers[]
const fetchQuestion = () => {
fetch(`http://localhost:5000/api/questions/${id}`)
.then(res => res.json())
.then(data => setQuestion(data))
.catch(err => console.error('Erreur:', err))
}
useEffect(() => {
fetchQuestion()
}, [id])
if (!question) return <p>Chargement...</p>
return (
<div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
<Link to='/' style={{ color: '#1A4A8A', fontSize: '14px' }}>
Retour a l'accueil
</Link>
<h1 style={{ marginTop: '16px' }}>{question.title}</h1>
<p style={{ color: '#555' }}>
<strong>Tag :</strong> {question.tag} &nbsp;|&nbsp;
<strong>Par :</strong> {question.author}
</p>
<p style={{ lineHeight: '1.6' }}>{question.body}</p>
<hr style={{ margin: '24px 0' }} />
<h2>Reponses ({question.answers.length})</h2>
{question.answers.length === 0 ? (
<p style={{ color: '#888' }}>Aucune reponse. Sois le premier !</p>
) : (
question.answers.map((ans, i) => (
<div key={i} style={{
border: '1px solid #ddd', borderRadius: '8px',
padding: '12px', marginBottom: '10px',
backgroundColor: '#f9f9f9'
}}>
<p style={{ margin: '0 0 6px 0' }}>{ans.body}</p>
<small style={{ color: '#888' }}>par {ans.author}</small>
</div>
))
)}
{/* Formulaire d'ajout de reponse */}
<AnswerForm
questionId={question._id}
onAnswerAdded={fetchQuestion}
/>
</div>
)
}
export default QuestionDetail