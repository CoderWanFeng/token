import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/hero'
import { ProvidersSection } from '../components/ProvidersSection'
import { HowToChoose } from '../components/HowToChoose'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Coding Plan 对比 - 找到最适合你的 AI 开发方案</title>
        <meta
          name="description"
          content="聚合阿里云、腾讯云、火山方舟、DeepSeek 等 16+ 主流 AI 云服务商的 Coding Plan 与 Token Plan，对比免费额度、功能和价格，找到最适合你的方案。"
        />
        <meta property="og:title" content="Coding Plan 对比 - 各大云服务商 AI 开发计划" />
        <meta
          property="og:description"
          content="聚合各大云服务商的 Coding Plan 与 Token Plan，助你轻松对比免费额度、功能特色和定价方案"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <main className="min-h-screen">
        <Hero />
        <ProvidersSection />
        <HowToChoose />
        <Footer />
      </main>
    </>
  )
}
