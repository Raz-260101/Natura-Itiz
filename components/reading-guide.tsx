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

 const ACCENT_COLOR = 'rgba(0, 255, 255, 0.9)'; 
const BAND_COLOR = 'rgba(230, 230, 255, 0.2)'; 

return (
  <div
    
    className="fixed left-0 right-0 pointer-events-none z-50 transition-all duration-75 ease-out"
    style={{
      
      top: position - 10, 
      height: "20px", 
      background: BAND_COLOR, 
    
      borderTop: `1px solid ${ACCENT_COLOR}`,
      borderBottom: `1px solid ${ACCENT_COLOR}`, 
      boxShadow: `0 0 15px ${ACCENT_COLOR}`,
    }}
  />
)
}
