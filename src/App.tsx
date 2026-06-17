import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from './components/NotFound'

// 路由级懒加载：把 Home / TokenGuide 拆到独立 chunk，首屏只下载一份
const Home = lazy(() => import('./pages/Home'))
const TokenGuide = lazy(() => import('./pages/TokenGuide'))
const Compare = lazy(() => import('./pages/Compare'))
const Calculator = lazy(() => import('./pages/Calculator'))
const Reviews = lazy(() => import('./pages/Reviews'))

function App() {
  return (
    <div>
      {/* GitHub Octocat - 右上角 */}
      <a
        href="https://github.com/CoderWanFeng/token"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="fixed top-4 right-4 z-50 w-8 h-8 rounded-full overflow-hidden shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200"
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          className="w-full h-full object-cover"
          loading="lazy"
          width="32"
          height="32"
        />
      </a>

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
        <Route path="/compare" element={<Compare />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </div>
  )
}

export default App
