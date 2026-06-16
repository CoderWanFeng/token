import { Calculator } from 'lucide-react'

const STEPS = [
  {
    step: 1,
    title: '输入计费',
    desc: '你发送给 AI 的文字，会被切分成 Token。例如："你好" ≈ 2 个 Token',
  },
  {
    step: 2,
    title: '输出计费',
    desc: 'AI 回复的文字，同样按 Token 计费。通常输出单价是输入的 2-3 倍',
  },
  {
    step: 3,
    title: '费用计算',
    desc: '总费用 = (输入 Token 数 × 输入单价 + 输出 Token 数 × 输出单价) ÷ 1,000,000',
  },
]

export function BillingSteps() {
  return (
    <div className="card-modern p-8 mb-8">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-text-primary">
        <Calculator className="w-5 h-5 text-accent" />
        计费原理
      </h3>
      <div className="space-y-5">
        {STEPS.map((item) => (
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
  )
}
