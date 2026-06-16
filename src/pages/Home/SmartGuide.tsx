import { useMemo, useState } from 'react'
import {
  Sparkles,
  ChevronRight,
  User,
  Users,
  Building2,
  Code2,
  Bot,
  MessageCircle,
  Trophy,
} from 'lucide-react'
import {
  providers,
  type Provider,
  type TargetRole,
  type UseCase,
} from '../../data/providers'

// ============================================================
// 常量（模块级，避免每次 render 重建）
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

// ============================================================
// 推荐引擎（useMemo 调用，本地纯逻辑，不抽到 lib）
// ============================================================

function pickTop3(all: Provider[], role: TargetRole, useCases: UseCase[]): Provider[] {
  // 1. 过滤：targetRoles 包含 role、useCases 至少一个交集（如果用户选了）
  const filtered = all.filter((p) => {
    const roleMatch = p.targetRoles?.includes(role) ?? false
    const useCaseMatch =
      useCases.length === 0 || useCases.some((uc) => p.useCases?.includes(uc))
    return roleMatch && useCaseMatch
  })
  // 2. 排序：costEfficiency 降序，没分的排后面
  return [...filtered]
    .sort((a, b) => (b.costEfficiency ?? 0) - (a.costEfficiency ?? 0))
    .slice(0, 3)
}

// 根据月用量 + 档位数组估算月费（元）
function estimateMonthlyCost(p: Provider, monthlyTokensM: number): number | null {
  if (monthlyTokensM <= 0 || !p.pricingTiers || p.pricingTiers.length === 0) return null
  const tokens = monthlyTokensM * 1_000_000
  // 找档位：tokens 大于等于需求量的最低档；没有的话用最高档
  const tier =
    p.pricingTiers.find((t) => t.tokens >= tokens) ??
    p.pricingTiers[p.pricingTiers.length - 1]
  const overage = Math.max(0, tokens - tier.tokens)
  return tier.monthlyFee + (overage / 1000) * tier.unitPrice
}

// ============================================================
// 主组件
// ============================================================

export function SmartGuide() {
  const [role, setRole] = useState<TargetRole | null>(null)
  const [useCases, setUseCases] = useState<UseCase[]>([])
  const [monthlyTokensM, setMonthlyTokensM] = useState<number>(0)

  const recommendations = useMemo(
    () => (role ? pickTop3(providers, role, useCases) : []),
    [role, useCases],
  )

  const toggleUseCase = (uc: UseCase) => {
    setUseCases((prev) => (prev.includes(uc) ? prev.filter((x) => x !== uc) : [...prev, uc]))
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-surface-light/40 to-background">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            智能导购
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-3">
            3 步找到最划算的 Plan
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            回答 3 个问题，系统自动帮你匹配性价比最高的方案
          </p>
        </div>

        {/* Step 1: 身份 */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs font-bold text-primary">STEP 1</span>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
              你的身份？
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {ROLES.map((r) => {
              const Icon = r.icon
              const active = role === r.id
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border-2 transition-all ${
                    active
                      ? 'bg-primary text-white border-primary shadow-button'
                      : 'bg-white text-text-primary border-border hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {r.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2: 用途（多选） */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs font-bold text-primary">STEP 2</span>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
              主要用途？（可多选）
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon
              const active = useCases.includes(uc.id)
              return (
                <button
                  key={uc.id}
                  onClick={() => toggleUseCase(uc.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border-2 transition-all ${
                    active
                      ? 'bg-primary text-white border-primary shadow-button'
                      : 'bg-white text-text-primary border-border hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {uc.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 3: 月用量（可选） */}
        <div className="mb-12">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs font-bold text-primary">STEP 3（可选）</span>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
              月 token 用量预估
            </h3>
          </div>
          <div className="flex items-center gap-3 max-w-md">
            <input
              type="number"
              min={0}
              step={0.5}
              value={monthlyTokensM || ''}
              onChange={(e) => setMonthlyTokensM(Number(e.target.value) || 0)}
              placeholder="比如 5"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-white text-text-primary focus:border-primary focus:outline-none transition-colors"
            />
            <span className="text-text-secondary font-medium whitespace-nowrap">
              M tokens / 月
            </span>
          </div>
          <p className="text-xs text-text-muted mt-2">
            留空也推荐，填了能算出月费
          </p>
        </div>

        {/* 推荐结果 */}
        <div>
          {role === null ? (
            <div className="text-center py-16 px-6 rounded-2xl bg-surface-light/30 border-2 border-dashed border-border">
              <Sparkles className="w-10 h-10 text-primary/40 mx-auto mb-3" />
              <p className="text-text-secondary">先选择身份，看到专属推荐</p>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-16 px-6 rounded-2xl bg-surface-light/30 border-2 border-dashed border-border">
              <p className="text-text-secondary">没有匹配的方案，试试调整用途</p>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-xs font-bold text-primary">为你推荐</span>
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                  Top {recommendations.length} · 按性价比排序
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {recommendations.map((p, idx) => (
                  <RecommendationCard
                    key={p.name}
                    provider={p}
                    rank={idx + 1}
                    monthlyTokensM={monthlyTokensM}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 推荐卡片
// ============================================================

function RecommendationCard({
  provider: p,
  rank,
  monthlyTokensM,
}: {
  provider: Provider
  rank: number
  monthlyTokensM: number
}) {
  const estimatedCost = useMemo(
    () => estimateMonthlyCost(p, monthlyTokensM),
    [p, monthlyTokensM],
  )

  const showFirstMonthDeal = p.firstMonthDeal && p.firstMonthDeal.price < (p.monthlyFee ?? 0)
  const displayFree = (p.freeMonthlyTokens ?? 0) / 1_000_000

  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-card border border-border hover:border-primary/40 hover:shadow-card-hover transition-all group flex flex-col">
      {rank === 1 && (
        <div className="absolute -top-3 -right-3 flex items-center gap-1 bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-button">
          <Trophy className="w-3 h-3" />
          最划算
        </div>
      )}

      {/* 头部 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{p.icon}</div>
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-bold text-text-primary truncate">{p.name}</h4>
          <p className="text-xs text-text-muted truncate">{p.enName}</p>
        </div>
      </div>

      {/* 性价比进度条 */}
      {p.costEfficiency !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-text-muted">性价比</span>
            <span className="font-bold text-primary">{p.costEfficiency}</span>
          </div>
          <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${p.costEfficiency}%` }}
            />
          </div>
        </div>
      )}

      {/* 月费 / 用量估算 */}
      <div className="bg-gradient-to-br from-surface-light/60 to-background rounded-xl p-4 mb-4 text-center border border-border/50">
        {estimatedCost !== null ? (
          <>
            <div className="text-2xl font-black text-text-primary">
              ¥{estimatedCost.toFixed(0)}
              <span className="text-sm font-normal text-text-muted"> /月</span>
            </div>
            <div className="text-xs text-text-muted mt-1">
              基于 {monthlyTokensM}M tokens 预估
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-black text-text-primary">
              {p.monthlyFee === 0 ? '免费' : `¥${p.monthlyFee}`}
              <span className="text-sm font-normal text-text-muted"> /月起</span>
            </div>
            {displayFree > 0 && (
              <div className="text-xs text-text-muted mt-1">
                含 {displayFree % 1 === 0 ? displayFree : displayFree.toFixed(1)}M 免费 tokens
              </div>
            )}
          </>
        )}
      </div>

      {/* 标签 */}
      <div className="flex flex-wrap gap-1.5 mb-5 min-h-[24px]">
        {p.useCases?.slice(0, 3).map((uc) => (
          <span
            key={uc}
            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
          >
            {uc}
          </span>
        ))}
        {showFirstMonthDeal && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            首月 ¥{p.firstMonthDeal!.price}
          </span>
        )}
      </div>

      {/* CTA */}
      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-1 w-full py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
      >
        立即开通
        <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  )
}
