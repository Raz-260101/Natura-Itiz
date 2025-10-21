import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ProductsSection } from "@/components/products-section"
import { MissionSection } from "@/components/mission-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { VendorsSection } from "@/components/vendors-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <VendorsSection />
        <MissionSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
