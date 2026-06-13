import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from './components/NotFound'

// 路由级懒加载：把 Home / TokenGuide 拆到独立 chunk，首屏只下载一份
const Home = lazy(() => import('./pages/Home'))
const TokenGuide = lazy(() => import('./pages/TokenGuide'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/token-guide" element={<TokenGuide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
