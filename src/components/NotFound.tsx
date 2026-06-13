import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <div className="text-7xl font-black gradient-text-static mb-4">404</div>
        <h1 className="text-2xl font-bold text-text-primary mb-3">页面不存在</h1>
        <p className="text-text-secondary mb-8">
          你访问的链接可能已被移除或地址输入有误。
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all duration-300"
        >
          <Home className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    </main>
  )
}
