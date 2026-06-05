import { Link } from 'react-router-dom'

export default function Home() {
  const questions = [
   
    { id: 1, title: "Question 1 " }
  ]

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Micro Forum</h1>
      <h2>Questions</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions.map(q => (
          <li key={q.id} style={{ marginBottom: "10px" }}>
            <Link 
              to={`/question/${q.id}`}
              style={{ textDecoration: "none", color: "#2563eb", fontSize: "18px" }}
            >
              {q.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}