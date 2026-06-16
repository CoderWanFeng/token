import { useState, useEffect, useRef } from 'react'
import { Button } from './Button'
import { ArrowRight, Sparkles, Zap, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-5xl md:text-6xl font-black tracking-tight mb-2" style={{
        background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {value}
      </div>
      <div className="text-text-muted text-sm md:text-base">{label}</div>
    </div>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  // 离开视口就停掉下面的无限动画，省 GPU；初始 true 保证首屏能正常起手
  const [isInView, setIsInView] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 背景装饰 */}
      <div className="absolute inset-0 mesh-bg dot-grid opacity-40" />

      {/* 轻量光球：仅在视口内 + 用户没开 reduce-motion 时才无限循环 */}
      <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl ${isInView ? 'motion-safe:animate-[float_8s_ease-in-out_infinite]' : ''}`} />
      <div className={`absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-accent/8 blur-3xl ${isInView ? 'motion-safe:animate-[float_10s_ease-in-out_infinite]' : ''}`} />
      <div className={`absolute -bottom-32 left-1/3 w-72 h-72 rounded-full bg-secondary/6 blur-3xl ${isInView ? 'motion-safe:animate-[float_7s_ease-in-out_infinite]' : ''}`} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pb-24 pt-36">
        {/* 标签 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-primary text-sm font-medium mb-10 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>聚合 <span className="text-primary font-semibold">16+</span> 主流 AI 云服务商 · 实时更新</span>
        </div>

        {/* 主标题 */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
          <span className="block text-text-primary mb-2">找到最适合你的</span>
          <span className="shimmer-text inline-block font-black">
            AI Coding Plan
          </span>
        </h1>

        {/* 副标题 */}
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
          一站式对比各大云服务商的 <span className="text-text-primary font-semibold">免费额度</span>、
          <span className="text-text-primary font-semibold">Token 定价</span>与
          <span className="text-accent font-semibold">模型能力</span>，
          零成本开启你的 AI 开发之旅。
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <a href="#smart-guide" className="group">
            <Button size="lg" className="group-hover:shadow-button-hover">
              立即挑选套餐
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <Link to="/calculator">
            <Button size="lg" variant="secondary">
              <Zap className="w-4 h-4" />
              算算我要花多少
            </Button>
          </Link>
        </div>

        {/* Token 入门链接 */}
        <div className="mb-14">
          <Link
            to="/token-guide"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border text-text-secondary hover:text-primary hover:border-primary/30 transition-all duration-300 text-sm group shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            还不了解 Token？花 5 分钟读懂它
            <span className="text-accent group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-3 gap-8 md:gap-20 max-w-2xl mx-auto">
          <StatCounter value="16+" label="云服务商" delay={200} />
          <StatCounter value="¥0" label="起步成本" delay={400} />
          <StatCounter value="100%" label="免费体验" delay={600} />
        </div>
      </div>
    </section>
  )
}
