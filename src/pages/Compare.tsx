import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  User,
  Users,
  Building2,
  Code2,
  Bot,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { providers, type Provider, type TargetRole, type UseCase } from '../data/providers'
import { Footer } from '../components/Footer'

// ============================================================
// 常量
// ============================================================

const ROLES: Array<{ id: TargetRole; label: string; icon: typeof User }> = [
  { id: '个人开发者', label: '个人开发者', icon: User },
  { id: '团队 Leader', label: '团队 Leader', icon: Users },
  { id: '企业 IT', label: '企业 IT', icon: Building2 },
]

const USE_CASES: Array<{ id: UseCase; label: string; icon: typeof Code2 }> = [
  { id: '写代码', label: '写代码', icon: Code2 },
  { id: '跑 Agent', label: '跑 Agent', icon: Bot },
  { id: '文本对话', label: '文本对话', icon: MessageCircle },
]

type SortKey = 'monthlyFee' | 'freeMonthlyTokens' | 'costEfficiency' | 'fiveHourLimit'
type SortDir = 'asc' | 'desc' | null

// ============================================================
// 工具函数
// ============================================================

function formatM(n: number | undefined): string {
  if (!n) return '-'
  return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
}

// ============================================================
// 主组件
// ============================================================

export default function Compare() {
  const [role, setRole] = useState<TargetRole | null>(null)
  const [useCases, setUseCases] = useState<UseCase[]>([])
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const filtered = useMemo(() => {
    let list = providers
    if (role) list = list.filter((p) => p.targetRoles?.includes(role))
    if (useCases.length > 0) {
      list = list.filter((p) => useCases.some((uc) => p.useCases?.includes(uc)))
    }
    return list
  }, [role, useCases])

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered
    const dir = sortDir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av === undefined && bv === undefined) return 0
      if (av === undefined) return 1
      if (bv === undefined) return -1
      return (av - bv) * dir
    })
  }, [filtered, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const toggleUseCase = (uc: UseCase) => {
    setUseCases((prev) => (prev.includes(uc) ? prev.filter((x) => x !== uc) : [...prev, uc]))
  }

  return (
    <>
      <Helmet>
        <title>实时比价看板 - 16+ AI Coding Plan 全维度对比</title>
        <meta
          name="description"
          content="动态对比 16 个 AI Coding Plan 的月费、免费额度、5 小时滚动限额、支持的 IDE、首月羊毛价、性价比评分，一表看清全部关键指标。"
        />
      </Helmet>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="py-12 px-4 bg-gradient-to-b from-surface-light/40 to-background border-b border-border/50">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/"
              className="text-sm text-text-muted hover:text-primary mb-3 inline-block"
            >
              ← 返回首页
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-3 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              实时比价看板
            </h1>
            <p className="text-text-secondary max-w-2xl">
              一表看清 16 个 Plan 的关键指标：月费、5 小时滚动限额、支持的 IDE、首月羊毛价、性价比评分
            </p>
          </div>
        </header>

        {/* 筛选区 */}
        <section className="px-4 py-6 border-b border-border/50 bg-white">
          <div className="max-w-7xl mx-auto space-y-4">
            <div>
              <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                按身份
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setRole(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                    role === null
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-text-primary border-border hover:border-primary/40'
                  }`}
                >
                  全部
                </button>
                {ROLES.map((r) => {
                  const Icon = r.icon
                  const active = role === r.id
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                        active
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-text-primary border-border hover:border-primary/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {r.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                按用途（可多选，至少一个匹配）
              </div>
              <div className="flex flex-wrap gap-2">
                {USE_CASES.map((uc) => {
                  const Icon = uc.icon
                  const active = useCases.includes(uc.id)
                  return (
                    <button
                      key={uc.id}
                      onClick={() => toggleUseCase(uc.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                        active
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-text-primary border-border hover:border-primary/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {uc.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="text-sm text-text-muted">
              共 <span className="font-bold text-primary">{sorted.length}</span> 个 Plan
            </div>
          </div>
        </section>

        {/* 表格 */}
        <section className="px-4 py-8">
          <div className="max-w-7xl mx-auto overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="text-left border-b-2 border-border">
                  <th className="p-3 text-sm font-bold text-text-muted sticky left-0 bg-background">
                    Provider
                  </th>
                  <SortHeader
                    label="月费"
                    sortKey="monthlyFee"
                    current={sortKey}
                    dir={sortDir}
                    onClick={toggleSort}
                  />
                  <SortHeader
                    label="免费额度"
                    sortKey="freeMonthlyTokens"
                    current={sortKey}
                    dir={sortDir}
                    onClick={toggleSort}
                  />
                  <SortHeader
                    label="5小时限额"
                    sortKey="fiveHourLimit"
                    current={sortKey}
                    dir={sortDir}
                    onClick={toggleSort}
                  />
                  <th className="p-3 text-sm font-bold text-text-muted">支持的 IDE</th>
                  <th className="p-3 text-sm font-bold text-text-muted">首月羊毛</th>
                  <SortHeader
                    label="性价比"
                    sortKey="costEfficiency"
                    current={sortKey}
                    dir={sortDir}
                    onClick={toggleSort}
                  />
                  <th className="p-3 text-sm font-bold text-text-muted"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p) => (
                  <CompareRow key={p.name} provider={p} />
                ))}
              </tbody>
            </table>
            {sorted.length === 0 && (
              <div className="text-center py-16 text-text-secondary">
                没有匹配的 Plan，试试调整筛选条件
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

// ============================================================
// 可排序表头
// ============================================================

function SortHeader({
  label,
  sortKey,
  current,
  dir,
  onClick,
}: {
  label: string
  sortKey: SortKey
  current: SortKey | null
  dir: SortDir
  onClick: (k: SortKey) => void
}) {
  const active = current === sortKey
  const Icon = !active ? ArrowUpDown : dir === 'asc' ? ArrowUp : ArrowDown
  return (
    <th className="p-3">
      <button
        onClick={() => onClick(sortKey)}
        className={`flex items-center gap-1 text-sm font-bold transition-colors ${
          active
            ? 'text-primary'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        {label}
        <Icon className="w-3 h-3" />
      </button>
    </th>
  )
}

// ============================================================
// 表格行
// ============================================================

function CompareRow({ provider: p }: { provider: Provider }) {
  return (
    <tr className="border-b border-border/50 hover:bg-surface-light/30 transition-colors">
      <td className="p-3 sticky left-0 bg-background">
        <div className="flex items-center gap-3 min-w-[180px]">
          <div className="text-2xl">{p.icon}</div>
          <div className="min-w-0">
            <div className="font-bold text-text-primary truncate">{p.name}</div>
            <div className="text-xs text-text-muted truncate">{p.enName}</div>
          </div>
        </div>
      </td>
      <td className="p-3">
        <div className="font-bold text-text-primary">
          {p.monthlyFee === 0 || p.monthlyFee === undefined
            ? '免费'
            : `¥${p.monthlyFee}`}
          {p.monthlyFee && p.monthlyFee > 0 && (
            <span className="text-xs font-normal text-text-muted"> /月</span>
          )}
        </div>
      </td>
      <td className="p-3 text-text-secondary">{formatM(p.freeMonthlyTokens)}</td>
      <td className="p-3 text-text-secondary">
        {p.fiveHourLimit === undefined ? (
          '-'
        ) : p.fiveHourLimit === 0 ? (
          <span className="text-text-muted">不限</span>
        ) : (
          `${(p.fiveHourLimit / 1000).toFixed(0)}K`
        )}
      </td>
      <td className="p-3">
        <div className="flex flex-wrap gap-1 max-w-[220px]">
          {p.supportedIdes?.slice(0, 3).map((ide) => (
            <span
              key={ide}
              className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary"
            >
              {ide}
            </span>
          ))}
          {p.supportedIdes && p.supportedIdes.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded bg-surface-light text-text-muted">
              +{p.supportedIdes.length - 3}
            </span>
          )}
          {!p.supportedIdes && <span className="text-xs text-text-muted">-</span>}
        </div>
      </td>
      <td className="p-3">
        {p.firstMonthDeal ? (
          <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent font-medium whitespace-nowrap">
            ¥{p.firstMonthDeal.price}
            {p.firstMonthDeal.tokens > 0 &&
              ` / ${(p.firstMonthDeal.tokens / 1_000_000).toFixed(1)}M`}
          </span>
        ) : (
          <span className="text-xs text-text-muted">-</span>
        )}
      </td>
      <td className="p-3">
        {p.costEfficiency !== undefined ? (
          <div className="flex items-center gap-2 w-32">
            <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${p.costEfficiency}%` }}
              />
            </div>
            <span className="text-xs font-bold text-primary w-8 text-right">
              {p.costEfficiency}
            </span>
          </div>
        ) : (
          <span className="text-xs text-text-muted">-</span>
        )}
      </td>
      <td className="p-3">
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors whitespace-nowrap"
        >
          访问
          <ExternalLink className="w-3 h-3" />
        </a>
      </td>
    </tr>
  )
}
