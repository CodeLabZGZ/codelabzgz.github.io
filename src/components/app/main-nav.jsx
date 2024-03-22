"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MainNav ({ className, ...props }) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/events"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/events" ? "" : "text-muted-foreground hover:text-primary"
        )}
      >
        Eventos
      </Link>
      <Link
        href="/teams"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/teams" ? "" : "text-muted-foreground hover:text-primary"
        )}
      >
        Equipos
      </Link>
    </nav>
  )
}
