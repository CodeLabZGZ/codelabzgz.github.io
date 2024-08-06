"use client"

import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"

export function Providers({ children }) {
  return (
    <>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
      <Analytics
        beforeSend={event => {
          if (localStorage.getItem("va-disable")) {
            return null
          }

          return event
        }}
      />
    </>
  )
}
