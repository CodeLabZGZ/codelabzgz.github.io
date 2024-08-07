"use client"

import { cn } from "@/lib/utils"
import { Link } from "next-view-transitions"
import { usePathname } from "next/navigation"

export function MainNav({ className, ...props }) {
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
          pathname === "/events"
            ? ""
            : "text-muted-foreground hover:text-primary"
        )}
      >
        Eventos
      </Link>
      <Link
        href="/teams"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/teams"
            ? ""
            : "text-muted-foreground hover:text-primary"
        )}
      >
        Equipos
      </Link>
      <Link
        href="/blog"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/blog" ? "" : "text-muted-foreground hover:text-primary"
        )}
      >
        Blog
      </Link>
    </nav>
  )
}
