import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  AlertTriangle,
  Sparkles,
  Search,
  BookOpen,
} from 'lucide-react'
import { providers, type Provider } from '../data/providers'
import { Footer } from '../components/Footer'

// 通用避坑主题（从 gotchas 抽取作为分类标签）
const TOPIC_KEYWORDS: Record<string, string[]> = {
  限流: ['限流', '高并发', '排队'],
  速度: ['慢', '延迟', '响应', '排队'],
  计费: ['计费', '收费', '额度', 'token', '余额', '独立', '充值', '按量'],
  体验: ['门槛', '外卡', '翻墙', 'VPN', '不稳定', '断流'],
  套餐: ['套餐', '免费', '档位', '赠', '首月'],
  文档: ['文档', 'API', '迁移', '示例'],
}

interface Review {
  provider: Provider
  gotchas: string[]
  topics: string[]
}

function classifyTopics(gotchas: string[]): string[] {
  const found = new Set<string>()
  for (const g of gotchas) {
    for (const [topic, kws] of Object.entries(TOPIC_KEYWORDS)) {
      if (kws.some((kw) => g.includes(kw))) found.add(topic)
    }
  }
  return Array.from(found)
}

function buildReviews(): Review[] {
  return providers
    .filter((p) => p.gotchas && p.gotchas.length > 0)
    .map((p) => ({
      provider: p,
      gotchas: p.gotchas!,
      topics: classifyTopics(p.gotchas!),
    }))
    .sort((a, b) => b.gotchas.length - a.gotchas.length)
}

const TOPIC_FILTERS = ['全部', '限流', '速度', '计费', '体验', '套餐', '文档']

export default function Reviews() {
  const [topic, setTopic] = useState<string>('全部')
  const [search, setSearch] = useState<string>('')

  const allReviews = useMemo(() => buildReviews(), [])

  const filtered = useMemo(() => {
    let list = allReviews
    if (topic !== '全部') {
      list = list.filter((r) => r.topics.includes(topic))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          r.provider.name.toLowerCase().includes(q) ||
          r.provider.enName.toLowerCase().includes(q) ||
          r.gotchas.some((g) => g.toLowerCase().includes(q)),
      )
    }
    return list
  }, [allReviews, topic, search])

  const totalGotchas = allReviews.reduce((sum, r) => sum + r.gotchas.length, 0)

  return (
    <>
      <Helmet>
        <title>评测与避坑 - 16+ AI Coding Plan 真实使用反馈</title>
        <meta
          name="description"
          content="聚焦无限调用陷阱、模型智商税、限流、计费暗坑等真实痛点，客观呈现各 AI Coding Plan 的避坑指南。"
        />
      </Helmet>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="py-12 px-4 bg-gradient-to-b from-surface-light/40 to-background border-b border-border/50">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/"
              className="text-sm text-text-muted hover:text-primary mb-3 inline-block"
            >
              ← 返回首页
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-3 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              评测与避坑
            </h1>
            <p className="text-text-secondary max-w-2xl mb-4">
              聚焦无限调用陷阱、模型智商税、限流、计费暗坑等真实痛点
            </p>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span>
                已收录 <span className="font-bold text-primary">{allReviews.length}</span> 家
              </span>
              <span>·</span>
              <span>
                <span className="font-bold text-primary">{totalGotchas}</span> 条避坑
              </span>
            </div>
          </div>
        </header>

        {/* 搜索 + 筛选 */}
        <section className="px-4 py-6 border-b border-border/50 bg-white sticky top-0 z-10">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索 provider 名称或避坑关键词…"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border bg-background text-text-primary focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {TOPIC_FILTERS.map((t) => {
                const active = topic === t
                return (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
                      active
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-text-primary border-border hover:border-primary/40'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 列表 */}
        <section className="px-4 py-8">
          <div className="max-w-5xl mx-auto space-y-5">
            {filtered.length === 0 && (
              <div className="text-center py-16 px-6 rounded-2xl bg-surface-light/30 border-2 border-dashed border-border">
                <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-3" />
                <p className="text-text-secondary">没有匹配的避坑记录</p>
              </div>
            )}

            {filtered.map((r) => (
              <ReviewCard key={r.provider.name} review={r} />
            ))}

            {/* 待写文章占位（未来手工补充） */}
            <UpcomingArticles />
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

// ============================================================
// 单条避坑卡片
// ============================================================

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-card border border-border hover:border-primary/30 transition-colors">
      <header className="flex items-start gap-4 mb-4">
        <div className="text-3xl">{review.provider.icon}</div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-text-primary">{review.provider.name}</h2>
          <p className="text-xs text-text-muted">{review.provider.enName}</p>
        </div>
        <a
          href={review.provider.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 rounded-lg bg-surface-light text-text-primary hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
        >
          访问 →
        </a>
      </header>

      <ul className="space-y-2">
        {review.gotchas.map((g, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-text-secondary"
          >
            <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span>{g}</span>
          </li>
        ))}
      </ul>

      {review.topics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-1.5">
          {review.topics.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-surface-light text-text-muted"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

// ============================================================
// 未来文章占位（数据沉淀后手工补）
// ============================================================

function UpcomingArticles() {
  const upcoming = [
    {
      title: '"无限调用"陷阱：5 小时滚动限额实测',
      hint: '对比 DeepSeek / Claude / 智谱 / 火山方舟 在 5 小时窗口内的真实可用量',
      status: '筹备中',
    },
    {
      title: '模型智商税：同价位 Coding 模型真实能力对比',
      hint: '用同一段复杂代码重构 prompt 测试各模型完成度 + 实际 token 消耗',
      status: '筹备中',
    },
    {
      title: 'Agent 框架横评：OpenClaw vs Cline vs Claude Code',
      hint: 'IDE 集成深度、Token 控制、稳定性、可观测性 4 维度',
      status: '筹备中',
    },
  ]
  return (
    <div className="mt-8 pt-8 border-t-2 border-dashed border-border">
      <div className="text-xs font-bold text-primary mb-4 uppercase tracking-wider">
        未来评测方向
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {upcoming.map((a) => (
          <div
            key={a.title}
            className="rounded-xl p-4 bg-surface-light/30 border-2 border-dashed border-border"
          >
            <div className="text-sm font-bold text-text-primary mb-1">{a.title}</div>
            <p className="text-xs text-text-muted mb-2 leading-relaxed">{a.hint}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-text-muted/10 text-text-muted">
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
