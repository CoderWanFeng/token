import { CheckCircle } from 'lucide-react'

const PRICE_DATA = [
  { model: 'GPT-4o', input: '$5.00', output: '$15.00', free: '$200 (Azure)' },
  { model: 'Claude 3.5', input: '$3.00', output: '$15.00', free: '免费积分' },
  { model: '通义千问 Qwen', input: '¥0.002', output: '¥0.006', free: '免费试用' },
  { model: 'DeepSeek V3', input: '¥0.001', output: '¥0.002', free: '¥10' },
  { model: '智谱 GLM-4', input: '¥0.001', output: '¥0.002', free: '100万 Token' },
  { model: 'Kimi moonshot', input: '¥0.012', output: '¥0.024', free: '¥15' },
]

export function PricingTable() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            主流模型 Token 价格参考
          </h2>
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
                {PRICE_DATA.map((row, i) => (
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
  )
}
