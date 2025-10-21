"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState } from "react"
import { products } from "@/lib/products-data"
import { useCart } from "@/contexts/cart-context"
import { useAccessibility } from "@/contexts/accessibility-context"

const filters = ["Todos", "Pollo", "Carne", "Pescado", "Vegetales", "Con Descuento", "Top"]

export default function ProductosPage() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { addItem } = useCart()
  const { announce } = useAccessibility()

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      activeFilter === "Todos" ||
      product.category === activeFilter ||
      (activeFilter === "Con Descuento" && product.originalPrice) ||
      (activeFilter === "Top" && product.badges.includes("TOP"))
    return matchesSearch && matchesFilter
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Nuestros Productos</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Explora nuestra selección de alimentos frescos y saludables de productores locales.
        </p>

        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-white text-primary border-primary hover:bg-primary/10"
              }
              onClick={() => {
                setActiveFilter(filter)
                announce(`Filtro cambiado a ${filter}`)
              }}
            >
              {filter}
            </Button>
          ))}
          <Badge variant="secondary" className="bg-white text-primary border border-primary px-4 py-2">
            {filteredProducts.length} Productos
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-gray-800">
              <div className="relative h-48">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.badges.length > 0 && (
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          badge === "ORGÁNICO"
                            ? "bg-green-500 text-white"
                            : badge === "TOP"
                              ? "bg-blue-500 text-white"
                              : "bg-red-500 text-white"
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
