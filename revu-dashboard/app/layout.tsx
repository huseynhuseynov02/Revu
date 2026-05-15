import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/lib/AppContext"

export const metadata: Metadata = {
  title: "Revu — Discover Local Spots | Gen-Z Social Discovery",
  description:
    "Revu is the Gen-Z social discovery platform for local spots. Find trending cafes, rooftop bars, clubs, and restaurants near you with real-time crowd data, trusted reviews, and TikTok-style video feeds.",
  keywords: ["social discovery", "local spots", "restaurants", "nightlife", "Baku", "Gen-Z", "trending places"],
  openGraph: {
    title: "Revu — Discover Local Spots",
    description: "Find trending cafes, rooftop bars, clubs, and restaurants near you.",
    type: "website",
  },
}

import { Plus_Jakarta_Sans } from "next/font/google"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${jakarta.variable}`}>
      <body className={`antialiased font-jakarta`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
