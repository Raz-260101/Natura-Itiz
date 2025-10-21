"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AccessibilitySettings {
  contrast: number // 0-100
  fontSize: number // 100-200 (percentage)
  nightMode: boolean
  grayscale: number // 0-100
  readingGuide: boolean
  typography: string // font family name
  screenReader: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void
  announce: (message: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export const fontOptions = [
  { value: "default", label: "Predeterminada" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "'Comic Sans MS', cursive", label: "Comic Sans" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "Tahoma, sans-serif", label: "Tahoma" },
]

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    contrast: 0,
    fontSize: 100,
    nightMode: false,
    grayscale: 0,
    readingGuide: false,
    typography: "default", // Cambiando valor inicial de "" a "default"
    screenReader: false,
  })

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const announce = (message: string) => {
    if (settings.screenReader) {
      const announcer = document.getElementById("accessibility-announcer")
      if (announcer) {
        announcer.textContent = message
        setTimeout(() => {
          announcer.textContent = ""
        }, 1000)
      }
    }
  }

  useEffect(() => {
    const root = document.documentElement

    if (settings.contrast > 0) {
      const contrastValue = 1 + settings.contrast / 100
      document.body.style.filter = `contrast(${contrastValue}) ${settings.grayscale > 0 ? `grayscale(${settings.grayscale}%)` : ""}`
    } else if (settings.grayscale > 0) {
      document.body.style.filter = `grayscale(${settings.grayscale}%)`
    } else {
      document.body.style.filter = ""
    }

    root.style.fontSize = `${settings.fontSize}%`

    // Night mode (dark mode)
    if (settings.nightMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    if (settings.typography && settings.typography !== "default") {
      root.style.fontFamily = settings.typography
    } else {
      root.style.fontFamily = ""
    }

    if (settings.screenReader) {
      const announcement = document.createElement("div")
      announcement.setAttribute("role", "status")
      announcement.setAttribute("aria-live", "polite")
      announcement.setAttribute("aria-atomic", "true")
      announcement.className = "sr-only"
      announcement.id = "accessibility-announcer"
      if (!document.getElementById("accessibility-announcer")) {
        document.body.appendChild(announcement)
      }
    }
  }, [settings])

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, announce }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
