import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Code2,
  Bot,
  Calculator as CalcIcon,
  Sparkles,
  TrendingUp,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { providers, type Provider } from '../data/providers'
import {
  behaviorToMonthlyTokensM,
  TOKENS_PER_LINE,
  TOKENS_PER_AGENT_RUN,
  estimateMonthlyCost,
} from '../lib/recommend'
import { Footer } from '../components/Footer'

// 预设场景（常见用量区间）
const PRESETS = [
  { label: '轻度（个人副业）', lines: 50, agents: 5, hint: '写写小项目' },
  { label: '中度（全职开发）', lines: 200, agents: 20, hint: '日常 coding + 偶尔 Agent' },
  { label: '重度（AI 重度用户）', lines: 500, agents: 100, hint: 'Coding Plan + 高频 Agent' },
] as const

export default function Calculator() {
  const [linesPerDay, setLinesPerDay] = useState<number>(PRESETS[1].lines)
  const [agentRunsPerDay, setAgentRunsPerDay] = useState<number>(PRESETS[1].agents)

  // 实时计算月 token
  const monthlyTokensM = useMemo(
    () => behaviorToMonthlyTokensM({ linesPerDay, agentRunsPerDay }),
    [linesPerDay, agentRunsPerDay],
  )

  // 实时算月费排序（按估算月费升序）
  const results = useMemo(() => {
    const items = providers
      .map((p) => ({
        provider: p,
        monthlyCost: estimateMonthlyCost(p, monthlyTokensM),
      }))
      .filter((item) => item.monthlyCost !== null) as Array<{
        provider: Provider
        monthlyCost: number
      }>
    return items.sort((a, b) => a.monthlyCost - b.monthlyCost)
  }, [monthlyTokensM])

  const monthlyCostText = useMemo(() => {
    if (results.length === 0) return null
    const cheapest = results[0]
    const mostExpensive = results[results.length - 1]
    if (results.length === 1) {
      return `唯一匹配 ${cheapest.provider.name}，月费 ¥${cheapest.monthlyCost.toFixed(0)}`
    }
    return `最省 ${cheapest.provider.name} ¥${cheapest.monthlyCost.toFixed(0)}/月 vs 最贵 ${mostExpensive.provider.name} ¥${mostExpensive.monthlyCost.toFixed(0)}/月`
  }, [results])

  return (
    <>
      <Helmet>
        <title>Token 消耗计算器 - 算算你每月该花多少钱</title>
        <meta
          name="description"
          content="杀手级工具：输入你每天写多少行代码、跑几次 Agent，自动计算每月 token 消耗，反向推荐最划算的 AI Coding Plan 档位，避免买贵了浪费。"
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
              <CalcIcon className="w-8 h-8 text-primary" />
              Token 消耗计算器
            </h1>
            <p className="text-text-secondary max-w-2xl">
              输入你每天写多少行代码 + 跑几次 Agent，自动算月 token 用量，反向推荐最划算的档位
            </p>
          </div>
        </header>

        {/* 输入区 */}
        <section className="px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-card border border-border">
              {/* 预设场景 */}
              <div className="mb-6">
                <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">
                  快速选择场景
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {PRESETS.map((p, idx) => {
                    const active =
                      linesPerDay === p.lines && agentRunsPerDay === p.agents
                    return (
                      <button
                        key={p.label}
                        onClick={() => {
                          setLinesPerDay(p.lines)
                          setAgentRunsPerDay(p.agents)
                        }}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          active
                            ? 'border-primary bg-primary/5 shadow-button'
                            : 'border-border bg-background hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div
                            className={`text-sm font-bold ${active ? 'text-primary' : 'text-text-primary'}`}
                          >
                            {p.label}
                          </div>
                          {idx === 1 && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                              推荐
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-text-muted">
                          {p.lines} 行/天 · {p.agents} 次 Agent/天
                        </div>
                        <div className="text-xs text-text-muted mt-1">{p.hint}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 自定义输入 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SliderInput
                  icon={Code2}
                  label="每天写多少行代码"
                  value={linesPerDay}
                  onChange={setLinesPerDay}
                  min={0}
                  max={2000}
                  step={10}
                  unit="行"
                  hint={`按 ${TOKENS_PER_LINE} tokens/行 估算`}
                />
                <SliderInput
                  icon={Bot}
                  label="每天跑几次 Agent 任务"
                  value={agentRunsPerDay}
                  onChange={setAgentRunsPerDay}
                  min={0}
                  max={500}
                  step={5}
                  unit="次"
                  hint={`按 ${TOKENS_PER_AGENT_RUN.toLocaleString()} tokens/次 估算`}
                />
              </div>
            </div>

            {/* 计算结果汇总 */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 md:p-8 text-white shadow-button">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs opacity-80 uppercase tracking-wider mb-1">
                    每日 token 消耗
                  </div>
                  <div className="text-3xl md:text-4xl font-black">
                    {((monthlyTokensM * 1_000_000) / 30).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-xs opacity-80 mt-1">tokens</div>
                </div>
                <div>
                  <div className="text-xs opacity-80 uppercase tracking-wider mb-1">
                    每月 token 消耗
                  </div>
                  <div className="text-3xl md:text-4xl font-black">
                    {monthlyTokensM.toFixed(1)}
                    <span className="text-base font-normal opacity-80"> M</span>
                  </div>
                  <div className="text-xs opacity-80 mt-1">× 30 天</div>
                </div>
                <div>
                  <div className="text-xs opacity-80 uppercase tracking-wider mb-1">
                    匹配方案
                  </div>
                  <div className="text-3xl md:text-4xl font-black">
                    {results.length}
                    <span className="text-base font-normal opacity-80"> 个 Plan</span>
                  </div>
                  <div className="text-xs opacity-80 mt-1">含档位数据</div>
                </div>
              </div>
              {monthlyCostText && (
                <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                  <TrendingUp className="w-4 h-4 inline-block mr-1 -mt-0.5" />
                  {monthlyCostText}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 推荐结果 */}
        {results.length > 0 && (
          <section className="px-4 py-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-xs font-bold text-primary">推荐档位</span>
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                  按月费升序 · {results.length} 个匹配
                </h2>
              </div>
              <div className="space-y-3">
                {results.map((item, idx) => (
                  <CalculatorRow
                    key={item.provider.name}
                    provider={item.provider}
                    monthlyCost={item.monthlyCost}
                    rank={idx + 1}
                    highlight={idx === 0}
                    monthlyTokensM={monthlyTokensM}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {results.length === 0 && (
          <section className="px-4 py-8">
            <div className="max-w-5xl mx-auto text-center py-12 px-6 rounded-2xl bg-surface-light/30 border-2 border-dashed border-border">
              <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-3" />
              <p className="text-text-secondary">
                目前没有 provider 含档位数据
                <br />
                <span className="text-xs text-text-muted">
                  暂只支持 DeepSeek、智谱、阿里、火山、OpenRouter 5 家
                </span>
              </p>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  )
}

// ============================================================
// 滑块输入
// ============================================================

function SliderInput({
  icon: Icon,
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  hint,
}: {
  icon: typeof Code2
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  unit: string
  hint: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <label className="text-sm font-semibold text-text-primary">{label}</label>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-primary"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-20 px-2 py-1 rounded-lg border border-border bg-white text-text-primary text-sm text-center focus:border-primary focus:outline-none"
        />
        <span className="text-text-secondary text-sm whitespace-nowrap">{unit}</span>
      </div>
      <p className="text-xs text-text-muted">{hint}</p>
    </div>
  )
}

// ============================================================
// 算账行
// ============================================================

function CalculatorRow({
  provider: p,
  monthlyCost,
  rank,
  highlight,
  monthlyTokensM,
}: {
  provider: Provider
  monthlyCost: number
  rank: number
  highlight: boolean
  monthlyTokensM: number
}) {
  return (
    <div
      className={`rounded-2xl p-5 border-2 transition-all ${
        highlight
          ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary shadow-button'
          : 'bg-white border-border hover:border-primary/30'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-2xl ${
            highlight ? 'bg-primary/10' : 'bg-surface-light'
          }`}
        >
          {p.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-text-primary">{p.name}</h3>
            {highlight && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white">
                最省
              </span>
            )}
            {p.costEfficiency !== undefined && (
              <span className="text-xs text-text-muted">
                · 性价比 {p.costEfficiency}
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            基于 {monthlyTokensM.toFixed(1)}M tokens 估算 · 包含档位 {p.pricingTiers?.[0]?.name}
            {p.pricingTiers && p.pricingTiers.length > 1 && ` ~ ${p.pricingTiers[p.pricingTiers.length - 1].name}`}
          </p>
        </div>
        <div className="text-right">
          <div
            className={`text-2xl font-black ${
              highlight ? 'text-primary' : 'text-text-primary'
            }`}
          >
            ¥{monthlyCost.toFixed(0)}
            <span className="text-xs font-normal text-text-muted"> /月</span>
          </div>
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 mt-1 text-xs ${
              highlight ? 'text-primary' : 'text-text-muted'
            } hover:underline`}
          >
            立即开通
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
