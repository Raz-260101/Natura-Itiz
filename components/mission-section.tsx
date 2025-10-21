import { Button } from "@/components/ui/button"
import Image from "next/image"

export function MissionSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-200 via-purple-100 to-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image src="/sustainable-agriculture-fields-aerial-view.jpg" alt="Campos agrícolas sostenibles" fill className="object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-600">Cultivando un Futuro Sostenible</h2>
            <div className="h-1 w-20 bg-green-500 rounded"></div>
            <p className="text-muted-foreground text-pretty">
              En Natura-Itiz, creemos en el poder de la soberanía alimentaria: el derecho de las comunidades a definir
              sus propias políticas agrícolas y alimentarias.
            </p>
            <p className="text-muted-foreground text-pretty">
              Al conectar directamente a productores locales con consumidores conscientes, fomentamos prácticas
              agrícolas sostenibles, fortalecemos las economías locales y te ofrecemos alimentos más frescos, nutritivos
              y llenos de sabor. Cada compra es un paso hacia un sistema alimentario más justo y resiliente.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-white">Conoce Nuestra Misión</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
