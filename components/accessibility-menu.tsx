"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"
import { useAccessibility, fontOptions } from "@/contexts/accessibility-context"

export function AccessibilityMenu() {
  const { settings, updateSetting, announce } = useAccessibility()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-primary/10"
          aria-label="Opciones de accesibilidad"
        >
          <Settings className="h-5 w-5 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4">
        <div className="px-2 py-1.5 text-sm font-semibold text-foreground mb-2">Accesibilidad</div>
        <DropdownMenuSeparator />

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Contraste: {settings.contrast}%</label>
            <Slider
              value={[settings.contrast]}
              onValueChange={([value]) => {
                updateSetting("contrast", value)
                announce(`Contraste ajustado a ${value}%`)
              }}
              max={100}
              step={10}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tamaño de lectura: {settings.fontSize}%</label>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => {
                updateSetting("fontSize", value)
                announce(`Tamaño de fuente ajustado a ${value}%`)
              }}
              min={100}
              max={200}
              step={10}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Modo nocturno</label>
            <Checkbox
              checked={settings.nightMode}
              onCheckedChange={(checked) => {
                updateSetting("nightMode", !!checked)
                announce(checked ? "Modo nocturno activado" : "Modo nocturno desactivado")
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Escala de grises: {settings.grayscale}%</label>
            <Slider
              value={[settings.grayscale]}
              onValueChange={([value]) => {
                updateSetting("grayscale", value)
                announce(`Escala de grises ajustada a ${value}%`)
              }}
              max={100}
              step={10}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Guía de lectura</label>
            <Checkbox
              checked={settings.readingGuide}
              onCheckedChange={(checked) => {
                updateSetting("readingGuide", !!checked)
                announce(checked ? "Guía de lectura activada" : "Guía de lectura desactivada")
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cambio de tipografía</label>
            <Select
              value={settings.typography}
              onValueChange={(value) => {
                updateSetting("typography", value)
                const fontName = fontOptions.find((f) => f.value === value)?.label || "Predeterminada"
                announce(`Tipografía cambiada a ${fontName}`)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar fuente" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Usar lector de pantalla</label>
            <Checkbox
              checked={settings.screenReader}
              onCheckedChange={(checked) => {
                updateSetting("screenReader", !!checked)
                if (checked) {
                  announce("Lector de pantalla activado")
                }
              }}
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
