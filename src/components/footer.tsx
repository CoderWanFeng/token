import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-2xl font-bold gradient-text mb-4">Coding Plan</div>
        <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
          专注于为开发者提供最全面的 AI 云服务商对比信息，帮助你做出明智的技术选择。
        </p>
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          <Link
            to="/"
            className="text-text-secondary hover:text-primary-light text-sm transition-colors"
          >
            服务商列表
          </Link>
          <Link
            to="/token-guide"
            className="text-text-secondary hover:text-primary-light text-sm transition-colors"
          >
            Token 入门指南
          </Link>
          <a
            href="#how-to-choose"
            className="text-text-secondary hover:text-primary-light text-sm transition-colors"
          >
            选择指南
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary-light text-sm transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
        <p className="text-text-secondary/60 text-sm">
          © 2024 Coding Plan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
