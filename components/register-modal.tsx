"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"

interface RegisterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegisterModal({ open, onOpenChange }: RegisterModalProps) {
  const [captcha] = useState("NXQWH")
  const [captchaInput, setCaptchaInput] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [activeTab, setActiveTab] = useState<"usuario" | "vendedor">("usuario")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (captchaInput !== captcha) {
      setError("El código captcha no coincide")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      // Simulate registration and auto-login
      await login(email, password, activeTab)
      onOpenChange(false)
      // Reset form
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setName("")
      setCaptchaInput("")
    } catch (err) {
      setError("Error al registrar la cuenta")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-primary">Únete a Natura-Itiz</DialogTitle>
          <p className="text-center text-sm text-muted-foreground">Crea tu cuenta para comenzar</p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="usuario">Usuario</TabsTrigger>
            <TabsTrigger value="vendedor">Vendedor</TabsTrigger>
          </TabsList>

          <TabsContent value="usuario" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-usuario">Nombre completo</Label>
                <Input id="name-usuario" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-usuario-reg">Correo electrónico</Label>
                <Input
                  id="email-usuario-reg"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-usuario-reg">Contraseña</Label>
                <Input
                  id="password-usuario-reg"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password-usuario">Confirmar contraseña</Label>
                <Input
                  id="confirm-password-usuario"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha-usuario-reg">Captcha: Escribe el código que ves en la imagen</Label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 px-4 py-2 rounded border border-gray-300 font-mono text-lg line-through">
                    {captcha}
                  </div>
                  <Button type="button" variant="link" className="text-primary">
                    Recargar
                  </Button>
                </div>
                <Input
                  id="captcha-usuario-reg"
                  placeholder="Código de la imagen"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Crear Cuenta
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="vendedor" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-vendedor">Nombre del negocio</Label>
                <Input id="name-vendedor" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-vendedor-reg">Correo electrónico</Label>
                <Input
                  id="email-vendedor-reg"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-vendedor-reg">Contraseña</Label>
                <Input
                  id="password-vendedor-reg"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password-vendedor">Confirmar contraseña</Label>
                <Input
                  id="confirm-password-vendedor"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha-vendedor-reg">Captcha: Escribe el código que ves en la imagen</Label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 px-4 py-2 rounded border border-gray-300 font-mono text-lg line-through">
                    {captcha}
                  </div>
                  <Button type="button" variant="link" className="text-primary">
                    Recargar
                  </Button>
                </div>
                <Input
                  id="captcha-vendedor-reg"
                  placeholder="Código de la imagen"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Crear Cuenta de Vendedor
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
