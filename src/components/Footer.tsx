import { Github, ArrowUp, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      // 合并到下一帧再 setState，避免每个 scroll 事件都触发 render
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setShowTop(window.scrollY > 400)
        ticking = false
      })
    }
    // passive: true 让浏览器不阻塞滚动（移动端尤其重要）
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const linkStyle = "flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors group"

  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* 品牌 */}
          <div>
            <div className="text-2xl font-black gradient-text-static mb-3">Coding Plan</div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              专注于为开发者提供最全面的 AI 云服务商对比信息，帮助你做出明智的技术选择。
            </p>
            <div className="text-xs text-text-muted">
              Made with ❤️ by 晚枫工作室
            </div>
          </div>

          {/* 导航 */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">快速导航</h4>
            <div className="space-y-2.5">
              <Link to="/" className={linkStyle}>
                <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:w-2 transition-all" />
                智能导购
              </Link>
              <Link to="/compare" className={linkStyle}>
                <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:w-2 transition-all" />
                实时比价看板
              </Link>
              <Link to="/calculator" className={linkStyle}>
                <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:w-2 transition-all" />
                Token 消耗计算器
              </Link>
              <Link to="/reviews" className={linkStyle}>
                <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:w-2 transition-all" />
                评测与避坑
              </Link>
              <Link to="/token-guide" className={linkStyle}>
                <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:w-2 transition-all" />
                Token 入门指南
              </Link>
            </div>
          </div>

          {/* 说明 */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">关于本站</h4>
            <div className="space-y-2.5 text-sm text-text-muted leading-relaxed">
              <p>所有链接均为官方推广链接，点击链接你不会多付钱，我可能获得少量推广佣金。</p>
              <p>数据仅供参考，实际价格以各平台官网为准。</p>
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Coding Plan · 晚枫工作室
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 回到顶部 */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-white border border-border shadow-lg flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
        aria-label="回到顶部"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  )
}
