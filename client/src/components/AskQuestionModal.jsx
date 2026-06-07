import { useState } from 'react'

function AskQuestionModal({ onClose, onQuestionAdded }) {
  const [form, setForm] = useState({ title: '', body: '', author: '', tag: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (form.title.length < 10) {
      alert('Le titre doit faire au moins 10 caractères')
      return
    }
    if (!form.body || !form.author || !form.tag) {
      alert('Tous les champs sont obligatoires')
      return
    }
    const res = await fetch('http://localhost:5000/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      onQuestionAdded()
      onClose()
    }
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
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(3px)',
    }}>
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
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#BDC3C7',
              fontSize: '22px',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Corps modal */}
        <div style={{ padding: '24px 28px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#5D6D7E', display: 'block', marginBottom: '6px' }}>
            Titre <span style={{ color: '#E74C3C' }}>*</span>
          </label>
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

          {/* Boutons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #D5D8DC',
                backgroundColor: '#F8F9FA',
                color: '#5D6D7E',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#4A90D9',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(74,144,217,0.4)',
              }}
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskQuestionModal