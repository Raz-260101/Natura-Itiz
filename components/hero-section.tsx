"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [showLogo, setShowLogo] = useState(false)

  return (
    <section className="relative bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200 py-24 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
          <span className="text-purple-600">Sabor</span> <span className="text-green-500">Auténtico,</span>
          <br />
          <span className="text-green-400">Vida Saludable</span>
        </h1>
        <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-8 text-pretty">
          Descubre la frescura de alimentos cultivados con pasión por productores locales. Conéctate con la tierra,
          apoya lo nuestro y nutre tu bienestar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            Explorar Productos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <div className="relative">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onMouseEnter={() => setShowLogo(true)}
              onMouseLeave={() => setShowLogo(false)}
            >
              Ver Cómo Funciona
            </Button>
            {showLogo && (
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl p-6 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">N</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
