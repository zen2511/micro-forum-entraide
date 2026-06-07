import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AnswerForm from '../components/AnswerForm'

function QuestionDetail() {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)

  const fetchQuestion = () => {
    fetch(`http://localhost:5000/api/questions/${id}`)
      .then(res => res.json())
      .then(data => setQuestion(data))
      .catch(err => console.error('Erreur:', err))
  }

  useEffect(() => {
    fetchQuestion()
  }, [id])

  if (!question) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#7F8C8D' }}>
      Chargement...
    </div>
  )

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>

      {/* Retour */}
      <Link to='/' style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: '#4A90D9',
        fontSize: '14px',
        marginBottom: '20px',
        fontWeight: '500',
        textDecorationLine:'none'
      }}>
        Retour à l'accueil
      </Link>

      {/* Carte question */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '28px 32px',
        marginBottom: '24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        borderLeft: '5px solid #4A90D9',
      }}>
        <h1 style={{
          color: '#1C2833',
          fontSize: '22px',
          fontWeight: '700',
          marginBottom: '14px',
          lineHeight: '1.4',
        }}>
          {question.title}
        </h1>
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '18px',
          fontSize: '13px',
        }}>
          <span style={{
            backgroundColor: '#EBF5FB',
            color: '#2E86C1',
            padding: '3px 12px',
            borderRadius: '20px',
            fontWeight: '600',
          }}>
            {question.tag}
          </span>
          <span style={{ color: '#7F8C8D' }}>
            par <strong style={{ color: '#5D6D7E' }}>{question.author}</strong>
          </span>
        </div>
        <p style={{
          color: '#4A4A4A',
          fontSize: '15px',
          lineHeight: '1.7',
          borderTop: '1px solid #F0F2F5',
          paddingTop: '16px',
        }}>
          {question.body}
        </p>
      </div>

      {/* Section réponses */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px 32px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        marginBottom: '20px',
      }}>
        <h2 style={{
          color: '#1C2833',
          fontSize: '17px',
          fontWeight: '700',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '2px solid #F0F2F5',
        }}>
          {question.answers.length} Réponse{question.answers.length > 1 ? 's' : ''}
        </h2>

        {question.answers.length === 0 ? (
          <p style={{ color: '#95A5A6', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
            Aucune réponse pour l'instant. Sois le premier a répondre !
          </p>
        ) : (
          question.answers.map((ans, i) => (
            <div key={i} style={{
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#F8F9FA',
              marginBottom: '12px',
              borderLeft: '3px solid #27AE60',
            }}>
              <p style={{
                color: '#2C3E50',
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '8px',
              }}>
                {ans.body}
              </p>
              <small style={{ color: '#95A5A6', fontSize: '12px' }}>
                par <strong style={{ color: '#5D6D7E' }}>{ans.author}</strong>
              </small>
            </div>
          ))
        )}
      </div>

      {/* Formulaire réponse */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px 32px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <AnswerForm
          questionId={question._id}
          onAnswerAdded={fetchQuestion}
        />
      </div>

    </div>
  )
}

export default QuestionDetail