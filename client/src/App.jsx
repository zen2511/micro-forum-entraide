import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import QuestionDetail from './pages/QuestionDetail'

const headerStyle = {
  backgroundColor: '#1C2833',
  padding: '',
  height: '80px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  position: 'sticky',
  top: 0,
  zIndex: '100',
  width: '100%'
}

const logoStyle = {
  color: '#FFFFFF',
  fontSize: '20px',
  fontWeight: '700',
  letterSpacing: '0.5px',
  textDecorationLine: 'none', 
  //fontSize:'28px', 
   padding: '2%'
}

const logoAccentStyle = {
  color: '#4A90D9',
}

// const navLinkStyle = {
//   color: '#BDC3C7',
//   fontSize: '14px',
//   padding: '6px 14px',
//   borderRadius: '6px',
//   border: '1px solid #4A90D9',
//   color: '#4A90D9',
//   transition: 'all 0.2s',
// }

function App() {
  return (
    <>
      <header style={headerStyle}>
        <Link to='/' style={logoStyle}>
          Micro <span style={logoAccentStyle}>Forum</span>
          {/* <span style={{ color: '#BDC3C7', fontSize: '13px', fontWeight: '400', marginLeft: '10px' }}>
            ENSPM
          </span> */}
        </Link>
        <span style={{ color: '#BDC3C7', fontSize: '13px', padding:'2%' }}>
          Votre Mini StackOverflow
        </span>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/question/:id' element={<QuestionDetail />} />
        </Routes>
      </main>
    </>
  )
}

export default App