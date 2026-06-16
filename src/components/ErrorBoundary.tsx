import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] caught error:', error, info)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="max-w-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-3">出错了</h1>
            <p className="text-text-secondary mb-8">
              页面渲染时遇到意外错误，请刷新或返回首页。
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="text-left text-xs text-red-700 bg-red-50 p-4 rounded-lg mb-6 overflow-auto max-h-40 whitespace-pre-wrap break-all">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-border text-text-secondary hover:border-primary/30 hover:text-primary transition-colors"
              >
                重试
              </button>
              <Link
                to="/"
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white hover:shadow-button-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                返回首页
              </Link>
            </div>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
