import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Sparkles, CheckCircle, Lightbulb, Zap, Shield, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Token 是什么？Coding Plan 有什么用？新手必读的 AI 开发入门指南",
  description: "详细解释 Token 的定义、计费原理，以及为什么开发者需要关注 Coding Plan。从零开始了解 AI API 调用成本，免费额度申请攻略。",
  keywords: [
    "Token 是什么",
    "AI Token 计费",
    "Coding Plan 是什么",
    "AI API 免费额度",
    "大模型调用成本",
    "程序员 AI 开发",
    "API Token 计算",
    "AI 开发入门",
    "OpenAI Token",
    "通义千问 Token",
    "DeepSeek Token",
    "智谱 AI Token",
  ],
  authors: [{ name: "程序员晚枫", url: "https://www.python-office.com" }],
  openGraph: {
    title: "Token 入门指南 | Coding Plan 对比",
    description: "5分钟搞懂 Token 计费原理，节省 90% AI 开发成本",
    url: "https://www.python-office.com/token-guide",
  },
};

export default function TokenGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary-light text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            新手入门指南
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="gradient-text">Token 是什么？</span>
            <br />
            <span className="text-text-primary">Coding Plan 有什么用？</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            5 分钟搞懂 AI 开发的底层逻辑，让你从"AI 小白"变成"会省钱的高手"。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn btn-primary">
              查看云服务商对比
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What is Token */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-primary" />
            什么是 Token？
          </h2>
          
          <div className="bg-surface border border-border rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-4 text-primary-light">📖 一句话解释</h3>
            <p className="text-lg text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Token = 文字的计量单位。</strong>
              你和 AI 对话时，AI 会把你的文字和回复都切成一个个 Token，然后按 Token 数量收费。
            </p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-6">📊 Token 计费原理</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold mb-2">输入计费</h4>
                  <p className="text-text-secondary">你发送给 AI 的文字，会被切分成 Token。例如："你好" ≈ 2 个 Token</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold mb-2">输出计费</h4>
                  <p className="text-text-secondary">AI 回复的文字，同样按 Token 计费。通常输出价格是输入的 2-3 倍</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold mb-2">费用计算</h4>
                  <p className="text-text-secondary">总费用 = (输入 Token 数 × 输入单价 + 输出 Token 数 × 输出单价) × 每百万 Token 价格</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-amber-500" />
              实际计算示例
            </h3>
            <div className="bg-background/50 rounded-xl p-6 font-mono text-sm">
              <p className="text-text-secondary mb-2">问题：你用 500 字提问，AI 回复 800 字</p>
              <p className="text-text-primary mb-1">输入：约 650 Token × $0.5/1M = $0.000325</p>
              <p className="text-text-primary mb-1">输出：约 1040 Token × $1.5/1M = $0.00156</p>
              <p className="text-primary font-bold mt-3">单次对话费用：约 $0.0019 (不到 1 分钱)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Coding Plan */}
      <section className="py-16 bg-surface/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-secondary" />
            为什么要关注 Coding Plan？
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-lg font-bold mb-3">省钱利器</h3>
              <p className="text-text-secondary">
                各厂商提供免费 Token 额度，从 10 元到 100 万 Token 不等。善用这些额度，初期开发几乎零成本。
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-3">快速上手</h3>
              <p className="text-text-secondary">
                Coding Plan 通常附带详细的 SDK 文档和示例代码，新手也能在 10 分钟内跑通第一个 AI 应用。
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3">企业级保障</h3>
              <p className="text-text-secondary">
                付费计划通常包含 SLA 保障、技术支持和更高配额，适合生产环境使用。
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-3">专属优惠</h3>
              <p className="text-text-secondary">
                部分 Coding Plan 提供长期折扣，比按量付费最高可节省 70% 成本。
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">💡 小白建议</h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              先从免费额度最多的平台开始（如智谱 AI 的 100 万 Token、火山方舟的 50 万 Token），
              练手阶段完全够用。等项目上线后，再根据实际用量选择性价比最高的方案。
            </p>
          </div>
        </div>
      </section>

      {/* Common Models */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-success" />
            主流模型的 Token 价格参考
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-surface border border-border rounded-2xl overflow-hidden">
              <thead className="bg-surface-light">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">模型</th>
                  <th className="px-6 py-4 text-left font-semibold">输入 ($/M)</th>
                  <th className="px-6 py-4 text-left font-semibold">输出 ($/M)</th>
                  <th className="px-6 py-4 text-left font-semibold">免费额度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-4">GPT-4o</td>
                  <td className="px-6 py-4 text-accent">$5.00</td>
                  <td className="px-6 py-4 text-accent">$15.00</td>
                  <td className="px-6 py-4">$200 (Azure)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Claude 3.5</td>
                  <td className="px-6 py-4 text-accent">$3.00</td>
                  <td className="px-6 py-4 text-accent">$15.00</td>
                  <td className="px-6 py-4">免费积分</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">通义千问 Qwen</td>
                  <td className="px-6 py-4 text-accent">¥0.002</td>
                  <td className="px-6 py-4 text-accent">¥0.006</td>
                  <td className="px-6 py-4">免费试用</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">DeepSeek V3</td>
                  <td className="px-6 py-4 text-accent">¥0.001</td>
                  <td className="px-6 py-4 text-accent">¥0.002</td>
                  <td className="px-6 py-4">¥10</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">智谱 GLM-4</td>
                  <td className="px-6 py-4 text-accent">¥0.001</td>
                  <td className="px-6 py-4 text-accent">¥0.002</td>
                  <td className="px-6 py-4">100万 Token</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Kimi moonshot</td>
                  <td className="px-6 py-4 text-accent">¥0.012</td>
                  <td className="px-6 py-4 text-accent">¥0.024</td>
                  <td className="px-6 py-4">¥15</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-text-secondary mt-4 text-center">
            * 价格仅供参考，实际价格以各平台官方定价为准
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-surface/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            常见问题
          </h2>

          <div className="space-y-4">
            <details className="bg-surface border border-border rounded-xl group">
              <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between">
                Token 和字符有什么区别？
                <span className="text-primary transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-6 pb-4 text-text-secondary">
                中文 1 个 Token ≈ 1-2 个汉字，英文 1 个 Token ≈ 3/4 个单词。AI 模型不是按"字数"计费，而是按"Token"计费。
              </div>
            </details>

            <details className="bg-surface border border-border rounded-xl group">
              <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between">
                免费额度用完了怎么办？
                <span className="text-primary transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-6 pb-4 text-text-secondary">
                可以注册多个平台的账号，或者升级到付费计划。建议先对比各平台的单价，选择性价比最高的方案。
              </div>
            </details>

            <details className="bg-surface border border-border rounded-xl group">
              <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between">
                Coding Plan 和 Token Plan 是一样的吗？
                <span className="text-primary transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-6 pb-4 text-text-secondary">
                本质上是一样的，都是按 Token 用量计费的套餐。有些平台叫"Coding Plan"，有些叫"Token Plan"或"资源包"。
              </div>
            </details>

            <details className="bg-surface border border-border rounded-xl group">
              <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between">
                如何估算一个月要花多少钱？
                <span className="text-primary transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-6 pb-4 text-text-secondary">
                可以用这个公式：<br />
                月费用 ≈ (日均对话次数 × 平均输入 Token + 日均对话次数 × 平均输出 Token) × 30 × 单价
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            访问各大云服务商的 Coding Plan 对比页面，找到最适合你的免费额度方案。
          </p>
          <Link href="/" className="btn btn-primary btn-lg">
            查看 Coding Plan 对比
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-8 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary">首页</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Token 入门指南</span>
          </nav>
        </div>
      </section>
    </main>
  );
}
