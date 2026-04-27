import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TokenGuide from './pages/TokenGuide'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/token-guide" element={<TokenGuide />} />
    </Routes>
  )
}

export default App
