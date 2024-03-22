import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav ({ className, ...props }) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/events"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Eventos
      </Link>
      <Link
        href="/teams"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Equipos
      </Link>
    </nav>
  )
}
