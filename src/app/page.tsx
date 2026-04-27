import { Hero } from "@/components/hero";
import { ProvidersSection } from "@/components/providers-section";
import { HowToChoose } from "@/components/how-to-choose";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProvidersSection />
      <HowToChoose />
      <Footer />
    </main>
  );
}
