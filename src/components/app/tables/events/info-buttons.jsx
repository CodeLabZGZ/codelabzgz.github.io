"use client"

import { Button } from "@/components/ui/button"
import { useParticipation } from "@/stores/participation"
import { Share2Icon } from "@radix-ui/react-icons"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

export function JoinLeaveButton({ event, state }) {
  const router = useRouter()
  const { participation } = useParticipation()

  return (
    <Button
      variant="secondary"
      onClick={() => {
        if (state) {
          const promise2Leave = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events/${event}/leave`,
            { method: "DELETE" }
          )

          toast.promise(promise2Leave, {
            loading: "Loading...",
            success: async res => {
              const { data, status } = await res.json()
              router.refresh()
              return "ok"
            },
            error: async res => {
              const { status } = await res.json()
              return "error"
            }
          })
        } else {
          const promise2Join = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events/${event}/join`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(
                participation?.type === "teams"
                  ? { team: participation.label }
                  : {}
              )
            }
          )

          toast.promise(promise2Join, {
            loading: "Loading...",
            success: async res => {
              const { data, status } = await res.json()
              router.refresh()
              return "ok"
            },
            error: async res => {
              const { status } = await res.json()
              return "error"
            }
          })
        }

        router.refresh()
      }}
    >
      {state ? "Abandonar" : "Inscribete"}
    </Button>
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
