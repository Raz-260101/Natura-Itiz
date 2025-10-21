"use client"

import { useEffect, useState } from "react"
import { useAccessibility } from "@/contexts/accessibility-context"

export function ReadingGuide() {
  const { settings } = useAccessibility()
  const [position, setPosition] = useState(0)

  useEffect(() => {
    if (!settings.readingGuide) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [settings.readingGuide])

  if (!settings.readingGuide) return null

  return (
    <div
      className="fixed left-0 right-0 pointer-events-none z-50"
      style={{
        top: position - 2,
        height: "4px",
        background: "linear-gradient(to bottom, transparent, rgba(147, 51, 234, 0.3), transparent)",
        boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
      }}
    />
  )
}
