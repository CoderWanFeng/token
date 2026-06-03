import { Search, BarChart3, Rocket, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '../lib/utils'

const steps = [
  {
    number: 1,
    title: "评估需求",
    description: "确定你的项目规模、API 调用频率和具体使用场景。考虑是个人项目还是企业级应用。",
    icon: Search,
    tips: ["个人项目 vs 团队项目", "预估每日 Token 用量", "是否需要多模态能力"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    number: 2,
    title: "比较方案",
    description: "对比不同服务商的免费额度、功能限制和技术特点。关注模型能力、响应速度和稳定性。",
    icon: BarChart3,
    tips: ["优先看免费额度", "对比输入输出单价", "查看模型支持列表"],
    color: "from-primary to-secondary",
    bgColor: "bg-primary/5",
  },
  {
    number: 3,
    title: "开始使用",
    description: "注册并获取 API Key，快速集成到你的项目中。多数平台提供详细的文档和 SDK 支持。",
    icon: Rocket,
    tips: ["先用免费额度测试", "查看官方 SDK 文档", "加入开发者社区"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
  },
]

export function HowToChoose() {
  return (
    <section id="how-to-choose" className="relative py-28 overflow-hidden bg-surface-light">
      {/* 背景点阵 */}
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 标题 */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
            <ChevronRight className="w-3 h-3" />
            三步搞定
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-text-primary">
            如何选择合适的 <span className="gradient-text">Coding Plan</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto text-balance">
            遵循这三个简单步骤，找到最适合你项目的方案
          </p>
        </div>

        {/* 步骤卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative group rounded-2xl border border-border bg-white p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* 步骤编号图标 */}
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br shadow-lg",
                step.color
              )}>
                <step.icon className="w-6 h-6 text-white" />
              </div>

              {/* 大数字水印 */}
              <div className="absolute top-6 right-6 text-7xl font-black opacity-3 select-none" style={{ color: step.color.split(' ')[0].replace('from-', '#'), opacity: 0.04 }}>
                {String(step.number).padStart(2, '0')}
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {step.description}
              </p>

              {/* 小提示 */}
              <div className={cn("rounded-xl p-4", step.bgColor)}>
                {step.tips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-secondary leading-relaxed py-0.5">
                    <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0" />
                    {tip}
                  </div>
                ))}
              </div>

              {/* 桌面端连接箭头 */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-text-muted">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-border shadow-sm text-sm text-text-secondary">
            <span>💡</span>
            小白建议：先从免费额度最多的平台开始，练手完全够用
          </div>
        </div>
      </div>
    </section>
  )
}
