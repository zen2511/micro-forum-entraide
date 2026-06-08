import { useState } from 'react'

function AskQuestionModal({ onClose, onQuestionAdded }) {
  const [form, setForm] = useState({ title: '', body: '', author: '', tag: '' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ Bouton désactivé si formulaire incomplet
  const isFormValid =
    form.title.length >= 10 &&
    form.body.trim() !== '' &&
    form.author.trim() !== '' &&
    form.tag.trim() !== ''

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    if (!isFormValid) return
    setLoading(true) // ✅ Spinner ON
    const res = await fetch('http://localhost:5000/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setLoading(false) // ✅ Spinner OFF
    if (res.ok) {
      setSuccess(true)
      setTimeout(() => {
        onQuestionAdded()
        onClose()
      }, 1500)
    } else {
      setError('Erreur lors de la publication. Réessaie.')
    }
  }

  // ✅ Fermeture en cliquant sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '14px',
    borderRadius: '8px',
    border: '1px solid #D5D8DC',
    fontSize: '14px',
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(3px)',
      }}
    >
      <div style={{
        background: '#FFFFFF',
        borderRadius: '14px',
        width: '520px',
        maxWidth: '95%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}>

        {/* En-tête modal */}
        <div style={{
          backgroundColor: '#1C2833',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '17px', fontWeight: '600' }}>
            Poser une question
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            color: '#BDC3C7', fontSize: '22px', cursor: 'pointer',
          }}>×</button>
        </div>

        {/* Corps modal */}
        <div style={{ padding: '24px 28px' }}>

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
                  Question publiée avec succès !
                </p>
                <p style={{ color: '#27AE60', fontSize: '12px', marginTop: '2px' }}>
                  Redirection en cours...
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

          {!success && (
            <>
              {/* Titre + compteur de caractères ✅ */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E' }}>
                  Titre <span style={{ color: '#E74C3C' }}>*</span>
                </label>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: form.title.length >= 10 ? '#27AE60' : '#E74C3C'
                }}>
                  {form.title.length}/10 min
                </span>
              </div>
              <input
                name='title'
                placeholder='Minimum 10 caractères...'
                onChange={handleChange}
                style={inputStyle}
              />

              <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E', display: 'block', marginBottom: '6px' }}>
                Détail du problème <span style={{ color: '#E74C3C' }}>*</span>
              </label>
              <textarea
                name='body'
                placeholder='Explique ton problème en détail...'
                onChange={handleChange}
                rows='4'
                style={{ ...inputStyle, resize: 'vertical' }}
              />

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E', display: 'block', marginBottom: '6px' }}>
                    Pseudonyme <span style={{ color: '#E74C3C' }}>*</span>
                  </label>
                  <input
                    name='author'
                    placeholder='Ton nom...'
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E', display: 'block', marginBottom: '6px' }}>
                    Tag <span style={{ color: '#E74C3C' }}>*</span>
                  </label>
                  <input
                    name='tag'
                    placeholder='React, Node.js...'
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button onClick={onClose} style={{
                  padding: '10px 20px', borderRadius: '8px',
                  border: '1px solid #D5D8DC', backgroundColor: '#F8F9FA',
                  color: '#5D6D7E', fontSize: '14px', fontWeight: '500',
                  cursor: 'pointer',
                }}>
                  Annuler
                </button>

                {/* ✅ Bouton désactivé + Spinner */}
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                  style={{
                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                    backgroundColor: isFormValid && !loading ? '#4A90D9' : '#AEB6BF',
                    color: 'white',
                    fontSize: '14px', fontWeight: '600',
                    cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
                    boxShadow: isFormValid && !loading ? '0 2px 8px rgba(74,144,217,0.4)' : 'none',
                    display: 'flex', alignItems: 'center', gap: '8px',
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
                  {loading ? 'Publication...' : 'Publier'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ✅ Animation spinner CSS */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AskQuestionModal
