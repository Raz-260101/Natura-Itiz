import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VendorsSection } from "@/components/vendors-section"

export default function VendedoresPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <VendorsSection />
      </main>
      <Footer />
    </div>
  )
}
