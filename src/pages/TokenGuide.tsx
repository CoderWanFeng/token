import { ArrowRight, BookOpen, Coins, Lightbulb, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { BillingSteps } from './TokenGuide/BillingSteps'
import { BenefitsGrid } from './TokenGuide/BenefitsGrid'
import { PricingTable } from './TokenGuide/PricingTable'
import { Faq } from './TokenGuide/Faq'

export default function TokenGuide() {
  return (
    <>
      <Helmet>
        <title>Token 入门指南 - 5 分钟读懂 AI 开发的底层逻辑</title>
        <meta
          name="description"
          content="新手入门指南：Token 是什么？Coding Plan 有什么用？计费原理、主流模型价格参考、常见问题一站搞定。"
        />
        <meta property="og:title" content="Token 入门指南 - 5 分钟读懂 AI 开发" />
        <meta
          property="og:description"
          content="Token 是 AI 的文字计量单位。本指南帮你搞懂 AI 开发的底层逻辑，从小白变成会省钱的高手。"
        />
        <meta property="og:type" content="article" />
      </Helmet>
      <main className="min-h-screen bg-background">
      {/* ========== Hero ========== */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 mesh-bg dot-grid opacity-30" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-primary text-sm font-medium mb-8 animate-fade-in">
            <BookOpen className="w-4 h-4" />
            新手入门指南 · 5 分钟读懂
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
            <span className="gradient-text">Token 是什么？</span>
            <br />
            <span className="text-text-primary">Coding Plan 有什么用？</span>
          </h1>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            一文搞懂 AI 开发的底层逻辑，让你从"AI 小白"变成"会省钱的高手"。
          </p>

          <Link
            to="/"
            className="btn-primary px-8 py-3.5 rounded-xl text-base"
          >
            查看云服务商对比
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========== 什么是 Token ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">什么是 Token？</h2>
          </div>

          {/* 一句话解释 */}
          <div className="card-modern p-8 mb-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📖</span>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">一句话解释</h3>
                <p className="text-lg text-text-secondary leading-relaxed">
                  <span className="text-text-primary font-semibold">Token = AI 的"文字计量单位"。</span>
                  你发给 AI 的文字和 AI 的回复，都会被切成 Token 来计费。
                </p>
              </div>
            </div>
          </div>

          <BillingSteps />

          {/* 计算示例 */}
          <div className="rounded-2xl p-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-primary">
              <Coins className="w-5 h-5 text-amber-500" />
              实际计算示例
            </h3>
            <div className="bg-white/70 rounded-xl p-6 font-mono text-sm space-y-1.5 border border-amber-100/50">
              <p className="text-text-secondary">📊 场景：你用 500 字提问，AI 回复 800 字</p>
              <p className="text-text-primary">→ 输入：约 650 Token × $0.5/1M = <span className="text-accent font-semibold">$0.000325</span></p>
              <p className="text-text-primary">→ 输出：约 1040 Token × $1.5/1M = <span className="text-accent font-semibold">$0.00156</span></p>
              <p className="text-success font-bold mt-3 pt-3 border-t border-amber-200">
                ✅ 单次对话费用：约 $0.0019（不到 1 分钱）
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 为什么要关注 Coding Plan ========== */}
      <section className="py-20 bg-surface-light">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">为什么要关注 Coding Plan？</h2>
          </div>

          <BenefitsGrid />

          {/* 小白建议 */}
          <div className="rounded-2xl p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 text-center">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-xl font-bold text-text-primary mb-3">小白建议</h3>
            <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
              先从免费额度最多的平台开始（如智谱 AI 的 100 万 Token、火山方舟的 50 万 Token），
              练手阶段完全够用。等项目上线后，再根据实际用量选择性价比最高的方案。
            </p>
          </div>
        </div>
      </section>

      <PricingTable />
      <Faq />

      {/* ========== CTA ========== */}
      <section className="py-24 text-center bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            准备好开始了吗？
          </h2>
          <p className="text-text-secondary mb-10 text-lg">
            访问各大云服务商的 Coding Plan 对比页面，找到最适合你的免费额度方案。
          </p>
          <Link
            to="/"
            className="btn-primary px-8 py-4 rounded-xl text-lg"
          >
            查看 Coding Plan 对比
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-6 border-t border-border bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-sm text-text-muted">
            <Link to="/" className="hover:text-primary transition-colors">首页</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Token 入门指南</span>
          </nav>
      </div>
    </section>
    </main>
    </>
  )
}
