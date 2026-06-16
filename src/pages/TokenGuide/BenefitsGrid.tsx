import { DollarSign, Sparkles, Shield, Zap, type LucideIcon } from 'lucide-react'

type Benefit = {
  icon: LucideIcon
  color: 'emerald' | 'accent' | 'primary' | 'secondary'
  title: string
  desc: string
}

const BENEFITS: Benefit[] = [
  {
    icon: DollarSign,
    color: 'emerald',
    title: '省钱利器',
    desc: '各厂商提供免费 Token 额度，从 ¥10 到 100 万 Token 不等。善用这些额度，初期开发几乎零成本。',
  },
  {
    icon: Zap,
    color: 'accent',
    title: '快速上手',
    desc: 'Coding Plan 通常附带详细的 SDK 文档和示例代码，新手也能在 10 分钟内跑通第一个 AI 应用。',
  },
  {
    icon: Shield,
    color: 'primary',
    title: '企业级保障',
    desc: '付费计划通常包含 SLA 保障、技术支持和更高配额，适合生产环境使用。',
  },
  {
    icon: Sparkles,
    color: 'secondary',
    title: '专属优惠',
    desc: '部分 Coding Plan 提供长期折扣，比按量付费最高可节省 70% 成本。',
  },
]

// 提到模块顶层：避免每次 render 重建 Record
const COLOR_CLASSES: Record<Benefit['color'], string> = {
  emerald: 'bg-emerald-100 text-emerald-600',
  accent: 'bg-cyan-100 text-cyan-600',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-purple-100 text-purple-600',
}

export function BenefitsGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-5 mb-10">
      {BENEFITS.map((item, i) => {
        const Icon = item.icon
        return (
          <div key={i} className="card-modern p-6">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                COLOR_CLASSES[item.color]
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
          </div>
        )
      })}
    </div>
  )
}
