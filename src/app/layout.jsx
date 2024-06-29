import "@/styles/globals.css"

import { Providers } from "@/app/providers"
import SWR from "@/components/swr"
import { Toaster } from "@/components/ui/sonner"
import clsx from "clsx"
import { ViewTransitions } from "next-view-transitions"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
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
  return (
    <ViewTransitions>
      <html
        lang="es"
        className={clsx("h-full antialiased", inter.variable)}
        suppressHydrationWarning
      >
        <body className="flex min-h-full flex-col">
          <SWR>
            <Providers>{children}</Providers>
            <Toaster />
          </SWR>
        </body>
      </html>
    </ViewTransitions>
  )
}
