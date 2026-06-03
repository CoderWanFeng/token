import { ArrowRight, BookOpen, Calculator, Sparkles, Zap, Shield, DollarSign, ChevronDown, Coins, Lightbulb, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '../lib/utils'

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card-modern overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-semibold text-text-primary pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-5 px-6' : 'max-h-0'}`}>
        <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

const faqData = [
  {
    q: 'Token 和字符有什么区别？',
    a: '中文 1 个 Token ≈ 1-2 个汉字，英文 1 个 Token ≈ 3/4 个单词。AI 模型不是按"字数"计费，而是按"Token"计费。',
  },
  {
    q: '免费额度用完了怎么办？',
    a: '可以注册多个平台的账号，或者升级到付费计划。建议先对比各平台的单价，选择性价比最高的方案。',
  },
  {
    q: 'Coding Plan 和 Token Plan 是一样的吗？',
    a: '本质上是一样的，都是按 Token 用量计费的套餐。有些平台叫"Coding Plan"，有些叫"Token Plan"或"资源包"。',
  },
  {
    q: '如何估算一个月要花多少钱？',
    a: '月费用 ≈ (日均对话次数 × 平均输入 Token + 日均对话次数 × 平均输出 Token) × 30 × 单价。建议先用免费额度实测一周再估算。',
  },
]

const priceData = [
  { model: 'GPT-4o', input: '$5.00', output: '$15.00', free: '$200 (Azure)' },
  { model: 'Claude 3.5', input: '$3.00', output: '$15.00', free: '免费积分' },
  { model: '通义千问 Qwen', input: '¥0.002', output: '¥0.006', free: '免费试用' },
  { model: 'DeepSeek V3', input: '¥0.001', output: '¥0.002', free: '¥10' },
  { model: '智谱 GLM-4', input: '¥0.001', output: '¥0.002', free: '100万 Token' },
  { model: 'Kimi moonshot', input: '¥0.012', output: '¥0.024', free: '¥15' },
]

export default function TokenGuide() {
  return (
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold btn-primary text-base"
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

          {/* 计费原理 */}
          <div className="card-modern p-8 mb-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-text-primary">
              <Calculator className="w-5 h-5 text-accent" />
              计费原理
            </h3>
            <div className="space-y-5">
              {[
                { step: 1, title: '输入计费', desc: '你发送给 AI 的文字，会被切分成 Token。例如："你好" ≈ 2 个 Token' },
                { step: 2, title: '输出计费', desc: 'AI 回复的文字，同样按 Token 计费。通常输出单价是输入的 2-3 倍' },
                { step: 3, title: '费用计算', desc: '总费用 = (输入 Token 数 × 输入单价 + 输出 Token 数 × 输出单价) ÷ 1,000,000' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
                    <p className="text-text-secondary text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[
              { icon: DollarSign, color: 'emerald', title: '省钱利器', desc: '各厂商提供免费 Token 额度，从 ¥10 到 100 万 Token 不等。善用这些额度，初期开发几乎零成本。' },
              { icon: Zap, color: 'accent', title: '快速上手', desc: 'Coding Plan 通常附带详细的 SDK 文档和示例代码，新手也能在 10 分钟内跑通第一个 AI 应用。' },
              { icon: Shield, color: 'primary', title: '企业级保障', desc: '付费计划通常包含 SLA 保障、技术支持和更高配额，适合生产环境使用。' },
              { icon: Sparkles, color: 'secondary', title: '专属优惠', desc: '部分 Coding Plan 提供长期折扣，比按量付费最高可节省 70% 成本。' },
            ].map((item, i) => {
              const Icon = item.icon
              const colorClasses: Record<string, string> = {
                emerald: 'bg-emerald-100 text-emerald-600',
                accent: 'bg-cyan-100 text-cyan-600',
                primary: 'bg-primary/10 text-primary',
                secondary: 'bg-purple-100 text-purple-600',
              }
              return (
                <div key={i} className="card-modern p-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorClasses[item.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>

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

      {/* ========== 价格参考 ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">主流模型 Token 价格参考</h2>
          </div>

          <div className="card-modern overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-surface-light border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">模型</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">输入 ($/M)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">输出 ($/M)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">免费额度</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0 hover:bg-surface-light/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-text-primary">{row.model}</td>
                      <td className="px-6 py-4 text-accent font-mono text-sm">{row.input}</td>
                      <td className="px-6 py-4 text-accent font-mono text-sm">{row.output}</td>
                      <td className="px-6 py-4 text-success font-medium text-sm">{row.free}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border">
              <p className="text-xs text-text-muted">* 价格仅供参考，实际价格以各平台官方定价为准</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-20 bg-surface-light">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">常见问题</h2>
          </div>

          <div className="space-y-3">
            {faqData.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all duration-300 text-lg"
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
  )
}
