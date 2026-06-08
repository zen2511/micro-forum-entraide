import { useState } from 'react'

function AnswerForm({ questionId, onAnswerAdded }) {
  const [body, setBody]       = useState('')
  const [author, setAuthor]   = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false) // ✅ Spinner

  // ✅ Bouton désactivé si champs vides
  const isFormValid = body.trim().length > 0 && author.trim().length > 0

  const handleSubmit = async () => {
    if (!isFormValid) return
    setLoading(true) // ✅ Spinner ON
    const res = await fetch(
      `http://localhost:5000/api/questions/${questionId}/answers`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, author })
      }
    )
    setLoading(false) // ✅ Spinner OFF
    if (res.ok) {
      setBody('')
      setAuthor('')
      setError('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      onAnswerAdded()
    } else {
      setError('Erreur lors de la publication. Réessaie.')
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
    boxSizing: 'border-box',
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

      {/* Message succès */}
      {success && (
        <div style={{
          backgroundColor: '#EAFAF1',
          border: '1px solid #27AE60',
          borderRadius: '8px',
          padding: '14px 18px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ fontSize: '20px' }}>✅</span>
          <div>
            <p style={{ color: '#1E8449', fontWeight: '700', fontSize: '14px' }}>
              Réponse publiée avec succès !
            </p>
            <p style={{ color: '#27AE60', fontSize: '12px', marginTop: '2px' }}>
              Ta réponse apparaît maintenant dans la liste.
            </p>
          </div>
        </div>
      )}

      {/* Message erreur */}
      {error && (
        <div style={{
          backgroundColor: '#FDEDEC',
          border: '1px solid #E74C3C',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>⚠️</span>
          <p style={{ color: '#C0392B', fontSize: '13px', fontWeight: '500' }}>{error}</p>
        </div>
      )}

      {/* ✅ Label + compteur de caractères pour la réponse */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E' }}>
          Ta réponse <span style={{ color: '#E74C3C' }}>*</span>
        </label>
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: body.trim().length > 0 ? '#27AE60' : '#AEB6BF',
        }}>
          {body.length} car.
        </span>
      </div>
      <textarea
        value={body}
        onChange={e => { setBody(e.target.value); setError('') }}
        placeholder='Écris ta réponse ici...'
        rows='4'
        style={{ ...inputStyle, resize: 'vertical' }}
      />

      <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E', display: 'block', marginBottom: '6px' }}>
        Ton pseudonyme <span style={{ color: '#E74C3C' }}>*</span>
      </label>
      <input
        value={author}
        onChange={e => { setAuthor(e.target.value); setError('') }}
        placeholder='Ton nom...'
        style={inputStyle}
      />

      {/* ✅ Bouton désactivé + Spinner */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid || loading}
        style={{
          padding: '10px 24px',
          backgroundColor: isFormValid && !loading ? '#27AE60' : '#AEB6BF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: isFormValid && !loading ? '0 2px 8px rgba(39,174,96,0.3)' : 'none',
          marginTop: '4px',
          cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background-color 0.2s',
        }}
      >
        {loading && (
          <span style={{
            width: '14px', height: '14px',
            border: '2px solid #ffffff55',
            borderTop: '2px solid #fff',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.7s linear infinite',
          }} />
        )}
        {loading ? 'Publication...' : 'Répondre'}
      </button>

      {/* ✅ Animation spinner CSS */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AnswerForm
