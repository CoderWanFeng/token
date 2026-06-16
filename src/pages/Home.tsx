import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/Hero'
import { ProvidersSection } from '../components/ProvidersSection'
import { HowToChoose } from '../components/HowToChoose'
import { Footer } from '../components/Footer'
import { SmartGuide } from './Home/SmartGuide'

export default function Home() {
  const [showAllProviders, setShowAllProviders] = useState(false)

  return (
    <>
      <Helmet>
        <title>Coding Plan 智能导购 - 3 步找到最划算的 AI 开发方案</title>
        <meta
          name="description"
          content="3 步问答式智能导购：你的身份 + 主要用途 + 月用量，自动匹配 16+ 主流 AI 云服务商中最划算的 Coding Plan，避免买贵了浪费。"
        />
        <meta property="og:title" content="Coding Plan 智能导购 - 找到最划算的 AI 编程方案" />
        <meta
          property="og:description"
          content="回答 3 个问题，自动推荐最划算的 Plan。覆盖 DeepSeek、智谱、火山方舟、阿里云百炼等 16+ 主流平台。"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <main className="min-h-screen">
        <Hero />
        <SmartGuide />

        {/* 全部 Plan 折叠区（次要浏览入口） */}
        <section className="py-12 px-4 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <button
                onClick={() => setShowAllProviders((v) => !v)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-text-primary text-sm font-medium border-2 border-border hover:border-primary/40 hover:text-primary transition-all"
              >
                {showAllProviders ? '收起全部 Plan' : '查看全部 16 个 Plan'}
                {showAllProviders ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <p className="text-xs text-text-muted mt-2">
                适合喜欢自己浏览对比的用户
              </p>
            </div>

            {showAllProviders && (
              <div className="mt-10">
                <ProvidersSection />
              </div>
            )}
          </div>
        </section>

        <HowToChoose />
        <Footer />
      </main>
    </>
  )
}
