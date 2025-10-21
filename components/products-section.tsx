"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import Link from "next/link"
import { products } from "@/lib/products-data"
import { useAccessibility } from "@/contexts/accessibility-context"

export function ProductsSection() {
  const { addItem } = useCart()
  const { announce } = useAccessibility()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (productId: string, productName: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
        announce(`${productName} eliminado de favoritos`)
      } else {
        newFavorites.add(productId)
        announce(`${productName} agregado a favoritos`)
      }
      return newFavorites
    })
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      vendor: product.vendor,
    })
    announce(`${product.name} agregado al carrito`)
  }

  const displayProducts = products.slice(0, 6)

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-300 via-purple-200 to-purple-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-600">Nuestros Tesoros Locales</h2>
          <Link href="/productos">
            <Button variant="link" className="text-purple-600 hover:text-purple-700">
              Ver todos los productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-gray-800">
              <div className="relative h-48">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.badges.length > 0 && (
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          badge === "ORGÁNICO" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                  onClick={() => toggleFavorite(product.id, product.name)}
                  aria-label={favorites.has(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </Button>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-purple-600 text-lg">{product.name}</h3>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-lg">${product.price.toFixed(2)}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-pretty">{product.description}</p>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Por: <span className="text-green-600">{product.vendor}</span>
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-purple-600 text-white hover:bg-purple-700"
                      onClick={() => handleAddToCart(product)}
                    >
                      Añadir
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                    >
                      Detalles
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
