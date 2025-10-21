"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRegisterClick?: () => void
}

export function LoginModal({ open, onOpenChange, onRegisterClick }: LoginModalProps) {
  const [captcha] = useState("NXQWH")
  const [captchaInput, setCaptchaInput] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState<"usuario" | "vendedor" | "admin">("usuario")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (captchaInput !== captcha) {
      setError("El código captcha no coincide")
      return
    }

    try {
      await login(email, password, activeTab)
      onOpenChange(false)
      // Reset form
      setEmail("")
      setPassword("")
      setCaptchaInput("")
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-primary">Bienvenido a Natura-Itiz</DialogTitle>
          <p className="text-center text-sm text-muted-foreground">Inicia sesión para continuar</p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usuario">Usuario</TabsTrigger>
            <TabsTrigger value="vendedor">Vendedor</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="usuario" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-usuario">Correo electrónico</Label>
                <Input
                  id="email-usuario"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-usuario">Contraseña</Label>
                <Input
                  id="password-usuario"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha-usuario">Captcha: Escribe el código que ves en la imagen</Label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 px-4 py-2 rounded border border-gray-300 font-mono text-lg line-through">
                    {captcha}
                  </div>
                  <Button type="button" variant="link" className="text-primary">
                    Recargar
                  </Button>
                </div>
                <Input
                  id="captcha-usuario"
                  placeholder="Código de la imagen"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Iniciar Sesión
              </Button>

              <p className="text-center text-sm">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false)
                    onRegisterClick?.()
                  }}
                  className="text-primary hover:underline"
                >
                  Regístrate aquí
                </button>
              </p>
            </form>
          </TabsContent>

          <TabsContent value="vendedor" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-vendedor">Correo electrónico</Label>
                <Input
                  id="email-vendedor"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-vendedor">Contraseña</Label>
                <Input
                  id="password-vendedor"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha-vendedor">Captcha: Escribe el código que ves en la imagen</Label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 px-4 py-2 rounded border border-gray-300 font-mono text-lg line-through">
                    {captcha}
                  </div>
                  <Button type="button" variant="link" className="text-primary">
                    Recargar
                  </Button>
                </div>
                <Input
                  id="captcha-vendedor"
                  placeholder="Código de la imagen"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Iniciar Sesión como Vendedor
              </Button>

              <p className="text-center text-sm">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false)
                    onRegisterClick?.()
                  }}
                  className="text-primary hover:underline"
                >
                  Regístrate aquí
                </button>
              </p>
            </form>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-admin">Correo electrónico</Label>
                <Input
                  id="email-admin"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-admin">Contraseña</Label>
                <Input
                  id="password-admin"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha-admin">Captcha: Escribe el código que ves en la imagen</Label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 px-4 py-2 rounded border border-gray-300 font-mono text-lg line-through">
                    {captcha}
                  </div>
                  <Button type="button" variant="link" className="text-primary">
                    Recargar
                  </Button>
                </div>
                <Input
                  id="captcha-admin"
                  placeholder="Código de la imagen"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Iniciar Sesión como Admin
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
