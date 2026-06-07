import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AskQuestionModal from '../components/AskQuestionModal'

const tagColors = {
  'React':      { bg: '#EBF5FB', color: '#2E86C1' },
  'JavaScript': { bg: '#FEF9E7', color: '#B7950B' },
  'Node.js':    { bg: '#E9F7EF', color: '#1E8449' },
  'MongoDB':    { bg: '#F4ECF7', color: '#7D3C98' },
  'Express':    { bg: '#FDEDEC', color: '#C0392B' },
}

function getTagStyle(tag) {
  return tagColors[tag] || { bg: '#EAF2FF', color: '#2471A3' }
}

function Home() {
  const [questions, setQuestions] = useState([])
  const [showModal, setShowModal] = useState(false)

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
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 20px' }}>

      {/* Bandeau hero */}
      <div style={{
        backgroundColor: '#1C2833',
        borderRadius: '12px',
        padding: '32px 36px',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            Forum d'Entraide ENSPM
          </h1>
          <p style={{ color: '#BDC3C7', fontSize: '14px' }}>
            {questions.length} question{questions.length > 1 ? 's' : ''} posée{questions.length > 1 ? 's' : ''} par la communauté
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: '#4A90D9',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 22px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(74,144,217,0.4)',
          }}
        >
          + Poser une question
        </button>
      </div>

      {/* Liste des questions */}
      {questions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          color: '#7F8C8D',
        }}>
          <p style={{ fontSize: '16px' }}>Aucune question pour l'instant.</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>Sois le premier à poser une question !</p>
        </div>
      ) : (
        questions.map(q => {
          const tagStyle = getTagStyle(q.tag)
          return (
            <div key={q._id} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              padding: '20px 24px',
              marginBottom: '12px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              borderLeft: '4px solid #4A90D9',
              transition: 'box-shadow 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'}
            >
              <Link to={`/question/${q._id}`}>
                <h3 style={{
                  color: '#1C2833',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '10px',
                  lineHeight: '1.4',
                }}>
                  {q.title}
                </h3>
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  backgroundColor: tagStyle.bg,
                  color: tagStyle.color,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  {q.tag}
                </span>
                <span style={{ color: '#95A5A6', fontSize: '13px' }}>
                  par <strong style={{ color: '#5D6D7E' }}>{q.author}</strong>
                </span>
              </div>
            </div>
          )
        })
      )}

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