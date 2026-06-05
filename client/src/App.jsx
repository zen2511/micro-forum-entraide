import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import QuestionDetail from './pages/QuestionDetail'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Micro Forum</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
      </Routes>
    </div>
  )
}

export default App