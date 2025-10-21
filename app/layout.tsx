import type React from "react"
import type { Metadata } from "next"
// Este archivo debe ser un Server Component para poder exportar metadata
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AccessibilityProvider } from "@/contexts/accessibility-context"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { ReadingGuide } from "@/components/reading-guide"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Natura-Itiz",
  description: "Sabor Auténtico, Vida Saludable",
  generator: 'v0.app'
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={"antialiased bg-white min-h-screen flex flex-col " + geistSans.variable + " " + geistMono.variable}>
        <AuthProvider>
          <CartProvider>
            <AccessibilityProvider>
              <ReadingGuide />
              <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
                {children}
              </div>
            </AccessibilityProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
