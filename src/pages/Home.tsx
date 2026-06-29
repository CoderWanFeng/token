import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/Hero'
import { ProvidersSection } from '../components/ProvidersSection'
import { HowToChoose } from '../components/HowToChoose'
import { Footer } from '../components/Footer'
import { SmartGuide } from './Home/SmartGuide'

export default function Home() {
  const [showSmartGuide, setShowSmartGuide] = useState(false)

  return (
    <>
      <Helmet>
        <title>AI Token 优惠聚合 - 各大云服务商 Coding Plan 一站对比</title>
        <meta
          name="description"
          content="聚合 16+ 主流 AI 云服务商的 Token 优惠信息：免费额度、套餐价格、模型能力一站对比，找到最划算的 AI Coding Plan。"
        />
        <meta property="og:title" content="AI Token 优惠聚合 - 各大云服务商 Coding Plan 一站对比" />
        <meta
          property="og:description"
          content="DeepSeek、智谱、火山方舟、阿里云百炼等 16+ 主流平台 Token 优惠实时更新，免费额度 + 套餐价格一站对比。"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <main className="min-h-screen">
        <Hero />

        {/* 主内容：各平台 Token 优惠信息（默认展开） */}
        <ProvidersSection />

        {/* 智能导购：可选功能，默认收起，用户有需要再打开 */}
        <section className="py-12 px-4 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <button
                onClick={() => setShowSmartGuide((v) => !v)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-text-primary text-sm font-medium border-2 border-border hover:border-primary/40 hover:text-primary transition-all"
              >
                {showSmartGuide ? '收起智能导购' : '不知道选哪个？打开智能导购帮你选'}
                {showSmartGuide ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <p className="text-xs text-text-muted mt-2">
                回答 3 个问题，自动推荐最划算的 Plan
              </p>
            </div>

            {showSmartGuide && (
              <div className="mt-10">
                <SmartGuide />
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