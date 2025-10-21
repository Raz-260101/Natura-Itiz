import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500">
      {/* CTA Section */}
      <div className="py-16 px-4 text-center border-b border-white/20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para Transformar tu Alimentación?</h2>
          <p className="text-white/90 mb-8 max-w-3xl mx-auto text-pretty">
            Únete a la comunidad Natura-Itiz. Como consumidor, disfruta de alimentos frescos y apoya lo local. Como
            productor, expande tu alcance y comparte tu pasión.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Crear Cuenta Ahora
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Conocer Más
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Image
                    src="/natura-itiz-logo.jpg"
                    alt="Natura-Itiz"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <span className="text-xl font-bold text-white">Natura-Itiz</span>
              </div>
              <p className="text-white/80 text-sm text-pretty">
                Conectamos productores locales con consumidores que buscan alimentos saludables y sostenibles.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div>
              <h3 className="font-bold text-white mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Productos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Vendedores
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Categorías */}
            <div>
              <h3 className="font-bold text-white mb-4">Categorías</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Frutas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Verduras
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Lácteos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Granos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                    Procesados Naturales
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-bold text-white mb-4">Contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-white/80 text-sm">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>Av. Principal #123, Ciudad</span>
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>+123 456 7890</span>
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span>info@natura-itiz.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 px-4 border-t border-white/20">
        <div className="container mx-auto text-center">
          <p className="text-white/80 text-sm">© 2025 Natura-Itiz. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
