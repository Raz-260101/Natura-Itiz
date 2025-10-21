import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const vendors = [
  {
    id: 1,
    name: "Eco Foods",
    logo: "/eco-foods-logo.jpg",
    rating: 4.9,
    location: "CDMX",
    description: "Productos orgánicos y frescos, líderes en ventas este mes.",
    tags: ["Orgánico", "Top", "Sustentable"],
    productCount: 32,
    isTop: true,
  },
  {
    id: 2,
    name: "Fresahood",
    logo: "/strawberry-logo.jpg",
    rating: 4.8,
    location: "Puebla",
    description: "Especialistas en frutas frescas y saludables.",
    tags: ["Frutas", "Top", "Saludable"],
    productCount: 21,
    isTop: true,
  },
  {
    id: 3,
    name: "Eat Green",
    logo: "/eat-green-logo.jpg",
    rating: 4.7,
    location: "Querétaro",
    description: "Variedad de verduras y snacks naturales.",
    tags: ["Verduras", "Top", "Natural"],
    productCount: 18,
    isTop: true,
  },
]

export function VendorsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-12">Vendedores Destacados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-2xl shadow-lg p-6 relative">
              {vendor.isTop && <Badge className="absolute top-4 right-4 bg-primary text-white">TOP</Badge>}

              <div className="flex flex-col items-center mb-4">
                <div className="relative h-32 w-32 mb-4">
                  <Image src={vendor.logo || "/placeholder.svg"} alt={vendor.name} fill className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{vendor.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{vendor.rating}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 text-center">{vendor.description}</p>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {vendor.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-700">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{vendor.productCount} productos</span>
                <Button className="bg-primary hover:bg-primary/90">Ver tienda →</Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-primary font-semibold mt-8">¡Estos son los vendedores top del momento!</p>
      </div>
    </section>
  )
}
