import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Cliente",
    avatar: "MG",
    rating: 5,
    text: "Desde que compro en Natura-Itiz, la calidad de mi alimentación ha mejorado notablemente. Los productos son frescos y puedo conocer exactamente de dónde vienen.",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Productor Local",
    avatar: "CR",
    rating: 5,
    text: "Como pequeño productor, esta plataforma me ha permitido llegar a más clientes y recibir un precio justo por mis productos. Es una relación donde todos ganamos.",
  },
  {
    id: 3,
    name: "Laura Martínez",
    role: "Cliente",
    avatar: "LM",
    rating: 4,
    text: "Me encanta poder apoyar directamente a los productores locales y saber que estoy consumiendo alimentos cultivados de manera responsable con el medio ambiente.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-300 via-purple-200 to-purple-100">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4">Lo que dicen nuestros usuarios</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Historias de clientes y productores que forman parte de nuestra comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground italic text-pretty">"{testimonial.text}"</p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
