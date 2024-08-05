"use client"

import { Button } from "@/components/ui/button"
import { useParticipation } from "@/stores/participation"
import { Share2Icon } from "@radix-ui/react-icons"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

const currentDate = new Date()

export function JoinLeaveButton({ event, state }) {
  const router = useRouter()
  const { participation } = useParticipation()

  function handleJoin() {
    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${event.slug}/participation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:
          participation?.type === "team"
            ? JSON.stringify({ team: participation.value })
            : undefined
      }
    )

    toast.promise(promise, {
      loading: "Estamos procesando tu solicitud, espera un poco...",
      success: () => {
        router.refresh()
        if (participation?.type === "team" && participation.value) {
          return (
            <p>
              Te has unido al evento con el equipo{" "}
              <span className="truncate whitespace-nowrap font-bold">
                {participation.label}
              </span>
              .
            </p>
          )
        }
        return (
          <p>
            Te has unido al evento <span className="font-bold">sin equipo</span>
            .
          </p>
        )
      },
      error: err => err.message
    })
  }

  function handleLeave() {
    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${event.slug}/participation`,
      { method: "DELETE" }
    )

    toast.promise(promise, {
      loading: "Estamos procesando tu solicitud, espera un poco...",
      success: () => {
        router.refresh()
        return `Has abandonado el evento.`
      },
      error: err => err.message
    })
  }

  return (
    currentDate <= new Date(event.endDate) && (
      <Button
        variant="secondary"
        onClick={() => {
          if (!state) handleJoin()
          else handleLeave()
        }}
      >
        {state ? "Abandonar" : "Inscribete"}
      </Button>
    )
  )
}

export function ShareButton() {
  const pathname = usePathname()
  return (
    <Button
      variant="outline"
      className="gap-1"
      onClick={() => {
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`
        )
        toast.success("Enlace copiado al portapapeles")
      }}
    >
      <Share2Icon />
      Compartir
    </Button>
  )
}
