import { Leaf, Users, ShieldCheck, Truck } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Productos Orgánicos",
    description:
      "Alimentos cultivados sin pesticidas ni químicos dañinos, respetando los ciclos naturales y el medio ambiente.",
  },
  {
    icon: Users,
    title: "Apoyo a Productores Locales",
    description:
      "Conectamos directamente a pequeños productores con consumidores, eliminando intermediarios y fortaleciendo la economía local.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad Garantizada",
    description:
      "Verificamos que todos los productos cumplan con estándares de calidad y prácticas sostenibles de producción.",
  },
  {
    icon: Truck,
    title: "Entrega a Domicilio",
    description:
      "Llevamos los productos frescos directamente a tu hogar, manteniendo la cadena de frescura desde el campo hasta tu mesa.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-600">
          ¿Por qué elegir Natura-Itiz?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
          Fomentamos un consumo saludable y sostenible, apoyando a pequeños emprendedores y promoviendo la soberanía
          alimentaria.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-purple-50 rounded-lg p-6 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <feature.icon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
