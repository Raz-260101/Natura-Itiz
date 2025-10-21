"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  name: string
  email: string
  type: "usuario" | "vendedor" | "admin"
  membership?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: "usuario" | "vendedor" | "admin") => Promise<void>
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string, type: "usuario" | "vendedor" | "admin") => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Error al iniciar sesión");
    }
    if (data.type !== type) {
      throw new Error("Tipo de usuario incorrecto");
    }
    setUser({
      name: data.name,
      email: data.email,
      type: data.type,
      membership: data.type === "usuario" ? "Usuario Familiar" : undefined,
    });
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
