import { useState } from 'react'
import { BookOpen, ChevronDown } from 'lucide-react'

// FAQ 题目 + 答案
const FAQ_DATA: { q: string; a: string }[] = [
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

// 用 grid-template-rows 自适应内容高度，避免 max-h-40 这种硬编码上限
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card-modern overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-semibold text-text-primary pr-4">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted transition-transform duration-300 flex-shrink-0 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <p className="text-text-secondary text-sm leading-relaxed px-6 pb-5">{a}</p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  return (
    <section className="py-20 bg-surface-light">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">常见问题</h2>
        </div>
        <div className="space-y-3">
          {FAQ_DATA.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
