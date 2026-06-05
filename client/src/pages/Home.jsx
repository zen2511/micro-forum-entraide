import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Questions</h1>
      {questions.map(q => (
        <div key={q.id}>
          <Link to={`/question/${q.id}`}>{q.title}</Link>
        </div>
      ))}
    </div>
  )
}