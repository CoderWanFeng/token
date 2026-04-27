import { Hero } from '../components/hero'
import { ProvidersSection } from '../components/ProvidersSection'
import { HowToChoose } from '../components/HowToChoose'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProvidersSection />
      <HowToChoose />
      <Footer />
    </main>
  )
}
