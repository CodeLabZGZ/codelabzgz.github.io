"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Link } from "next-view-transitions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const currentDate = new Date()

export function DataTableRowActions({ row }) {
  const router = useRouter()
  const { participation } = useParticipation()

  const { startDate, endDate, participating, slug } = row.original

  function handleJoin() {
    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}/participation`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}/participation`,
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
                onClick={() => handleJoin()}
              >
                <TbTicket className="h-4 w-4" />
                Inscribete
              </button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <button
                className="flex w-full items-center gap-x-2"
                onClick={() => handleLeave()}
              >
                <TbTicketOff className="h-4 w-4" />
                Abandonar
              </button>
            </DropdownMenuItem>
          ))}
        <DropdownMenuItem>
          <Link
            href={`/events/${slug}/info`}
            className="flex w-full items-center gap-x-2"
          >
            <TbInfoSquare className="h-4 w-4" />
            Información
          </Link>
        </DropdownMenuItem>
        {new Date(startDate) <= currentDate && (
          <DropdownMenuItem>
            <Link
              href={`/events/${slug}/scoreboard`}
              className="flex w-full items-center gap-x-2"
            >
              <TbTimeline className="h-4 w-4" />
              Resultados
            </Link>
          </DropdownMenuItem>
        )}
        {new Date(endDate) <= currentDate && participating ? (
          <DropdownMenuItem className="flex items-center gap-x-2">
            <Link
              href={`/events/${slug}/cert`}
              className="flex w-full items-center gap-x-2"
            >
              <TbCertificate className="h-4 w-4" />
              Certificado
            </Link>
          </DropdownMenuItem>
        ) : null}
        {participating && currentDate <= new Date(endDate) ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/events/${slug}`}
                className="flex w-full items-center justify-center gap-x-2"
              >
                Entrar
              </Link>
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
