"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { LoginModal } from "@/components/login-modal"
import { RegisterModal } from "@/components/register-modal"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { CartSheet } from "@/components/cart-sheet"

export function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { user, isLoggedIn, logout } = useAuth()
  const { itemCount } = useCart()

  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/natura-itiz-logo.png"
                  alt="Natura-Itiz Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-semibold text-primary">Natura-Itiz</span>
              </Link>
              <AccessibilityMenu />
            </div>

            <div className="flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Inicio
              </Link>
              <Link href="/productos" className="text-foreground hover:text-primary transition-colors font-medium">
                Productos
              </Link>
              <Link href="/vendedores" className="text-foreground hover:text-primary transition-colors font-medium">
                Vendedores
              </Link>
              {user?.type === "vendedor" && (
                <Link href="/vendedores/mis-productos" className="font-bold text-purple-700">
                  Mis Productos
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowCart(true)}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              {isLoggedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <User className="h-4 w-4" />
                      {user.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/perfil">Configurar datos</Link>
                    </DropdownMenuItem>
                    {user?.type === "vendedor" && (
                      <DropdownMenuItem asChild>
                        <Link href="/vendedores/mis-productos">Agregar producto</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-600" onClick={logout}>
                      Salir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowLoginModal(true)}>
                  <User className="h-4 w-4" />
                  Ingresar
                </Button>
              )}
            </div>
          </nav>
        </div>
      </header>
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onRegisterClick={() => setShowRegisterModal(true)}
      />
      <RegisterModal open={showRegisterModal} onOpenChange={setShowRegisterModal} />
      <CartSheet open={showCart} onOpenChange={setShowCart} />
    </>
  )
}
