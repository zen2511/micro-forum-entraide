import { useState } from 'react'

function AnswerForm({ questionId, onAnswerAdded }) {
  const [body, setBody]     = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = async () => {
    if (!body.trim() || !author.trim()) {
      alert('Remplis tous les champs')
      return
    }
    const res = await fetch(
      `http://localhost:5000/api/questions/${questionId}/answers`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, author })
      }
    )
    if (res.ok) {
      setBody('')
      setAuthor('')
      onAnswerAdded()
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #D5D8DC',
    fontSize: '14px',
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
    outline: 'none',
    marginBottom: '12px',
  }

  return (
    <div>
      <h3 style={{
        color: '#1C2833',
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '16px',
        paddingBottom: '10px',
        borderBottom: '2px solid #F0F2F5',
      }}>
        Ajouter une réponse
      </h3>

      <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E', display: 'block', marginBottom: '6px' }}>
        Ta réponse <span style={{ color: '#E74C3C' }}>*</span>
      </label>
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder='Écris ta réponse ici...'
        rows='4'
        style={{ ...inputStyle, resize: 'vertical' }}
      />

      <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E', display: 'block', marginBottom: '6px' }}>
        Ton pseudonyme <span style={{ color: '#E74C3C' }}>*</span>
      </label>
      <input
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder='Ton nom...'
        style={inputStyle}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 24px',
          backgroundColor: '#27AE60',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 2px 8px rgba(39,174,96,0.3)',
          marginTop: '4px',
        }}
      >
        Répondre
      </button>
    </div>
  )
}

export default AnswerForm