import "@/styles/globals.css"

import { Providers } from "@/app/providers"
import SWR from "@/components/swr"
import { Toaster } from "@/components/ui/sonner"
import clsx from "clsx"
import { Inter } from "next/font/google"
import localFont from "next/font/local"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

const monaSans = localFont({
  src: "../fonts/Mona-Sans.var.woff2",
  display: "swap",
  variable: "--font-mona-sans",
  weight: "200 900"
})

export const metadata = {
  title: "CodeLab",
  description:
    "¡CodeLab es la asociación de estudiantes de Informática de la EINA en Zaragoza! Eventos de alto nivel, hackatones emocionantes, meetups inspiradores y más.",
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`
    }
  }
}

export default function RootLayout({ children }) {
  const a = 12
  return (
    <html
      lang="es"
      className={clsx("h-full antialiased", inter.variable, monaSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <SWR>
          <Providers>{children}</Providers>
          <Toaster />
        </SWR>
      </body>
    </html>
  )
}
