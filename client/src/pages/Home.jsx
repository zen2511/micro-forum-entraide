import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AskQuestionModal from '../components/AskQuestionModal'
function Home() {
const [questions, setQuestions] = useState([])
const [showModal, setShowModal] = useState(false)
// Charge les questions depuis l'API
const fetchQuestions = () => {
fetch('http://localhost:5000/api/questions')
.then(res => res.json())
.then(data => setQuestions(data))
.catch(err => console.error('Erreur fetch:', err))
}
useEffect(() => {
fetchQuestions()
}, [])
return (
<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
<h1>Forum d'Entraide ENSPM</h1>
{/* Bouton ouvre le modal */}
<button
onClick={() => setShowModal(true)}
style={{
marginBottom: '20px', padding: '10px 20px',
backgroundColor: '#1A4A8A', color: 'white',
border: 'none', borderRadius: '6px', cursor: 'pointer'
}}
>
+ Poser une question
</button>
{/* Liste des questions */}
{questions.length === 0 ? (
<p>Aucune question pour l'instant.</p>
) : (
questions.map(q => (
<div key={q._id} style={{
border: '1px solid #ddd', borderRadius: '8px',
padding: '15px', marginBottom: '12px',
backgroundColor: '#f9f9f9'
}}>
<Link to={`/question/${q._id}`}
style={{ textDecoration: 'none', color: '#1A4A8A' }}
>
<h3 style={{ margin: '0 0 8px 0' }}>{q.title}</h3>
</Link>
<span style={{
backgroundColor: '#E8F0FB', color: '#1A4A8A',
padding: '2px 8px', borderRadius: '4px', fontSize: '13px'
}}>
{q.tag}
</span>
<span style={{ marginLeft: '10px', color: '#555', fontSize: '13px' }}>
par {q.author}
</span>
</div>
))
)}
{/* Modal creation question */}
{showModal && (
<AskQuestionModal
onClose={() => setShowModal(false)}
onQuestionAdded={fetchQuestions}
/>
)}
</div>
)
}
export default Home