"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  TbCertificate,
  TbInfoSquare,
  TbTicket,
  TbTicketOff,
  TbTimeline
} from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { useParticipation } from "@/stores/participation"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const currentDate = new Date()

export function DataTableRowActions({ row }) {
  const router = useRouter()
  const { participation } = useParticipation()

  const { id, title, startDate, endDate, participating } = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {currentDate <= new Date(endDate) &&
          (!participating ? (
            <DropdownMenuItem>
              <button
                className="flex w-full items-center gap-x-2"
                onClick={() => {
                  const promise = fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/events/${id}/join`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(
                        participation?.type === "team"
                          ? { team: participation.label }
                          : {}
                      )
                    }
                  )

                  toast.promise(promise, {
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
                }}
              >
                <TbTicket className="h-4 w-4" />
                Inscribete
              </button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <button
                className="flex w-full items-center gap-x-2"
                onClick={async () => {
                  const promise = fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/events/${id}/leave`,
                    { method: "DELETE" }
                  )

                  toast.promise(promise, {
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
                }}
              >
                <TbTicketOff className="h-4 w-4" />
                Abandonar
              </button>
            </DropdownMenuItem>
          ))}
        <DropdownMenuItem>
          <Link
            href={`/events/${title.replaceAll(" ", "-")}/info`}
            className="flex w-full items-center gap-x-2"
          >
            <TbInfoSquare className="h-4 w-4" />
            Información
          </Link>
        </DropdownMenuItem>
        {new Date(startDate) <= currentDate && (
          <DropdownMenuItem>
            <Link
              href={`/events/${title.replaceAll(" ", "-")}/scoreboard`}
              className="flex w-full items-center gap-x-2"
            >
              <TbTimeline className="h-4 w-4" />
              Resultados
            </Link>
          </DropdownMenuItem>
        )}
        {new Date(endDate) <= currentDate && (
          <DropdownMenuItem className="flex items-center gap-x-2" disabled>
            <TbCertificate className="h-4 w-4" />
            Certificado
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
