"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { TbCertificate, TbInfoSquare, TbTicket, TbTicketOff, TbTimeline } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { toast } from "sonner"
import { useSWRConfig } from "swr"
import { useTeam } from "@/stores/team"

const currentDate = new Date()

export function DataTableRowActions ({ row }) {
  const { mutate } = useSWRConfig()
  const { startDate, endDate, user, title, id } = row.original
  const { selectedTeam } = useTeam()

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
        {currentDate <= new Date(endDate) && (
          !user
            ? (
              <DropdownMenuItem>
                <button
                  className="w-full flex items-center gap-x-2"
                  onClick={() => {
                    const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}/join`, { 
                      method: "POST",
                      headers: { "Content-Type" : "application/json" },
                      body: JSON.stringify(selectedTeam?.id ? { team: selectedTeam.id } : {})
                    })

                    toast.promise(promise, {
                      loading: 'Loading...',
                      success: async (res) => {
                        const { data, status } = await res.json()
                        return "ok"
                      },
                      error: async (res) => {
                        const { status } = await res.json()
                        return "error"
                      },
                    })
                  }}
                >
                  <TbTicket className="w-4 h-4"/>
                Inscribete
                </button>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <button
                  className="w-full flex items-center gap-x-2"
                  onClick={async () => {
                    const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}/leave`, { method: "DELETE" })

                    toast.promise(promise, {
                      loading: 'Loading...',
                      success: async (res) => {
                        const { data, status } = await res.json()
                        return "ok"
                      },
                      error: async (res) => {
                        const { status } = await res.json()
                        return "error"
                      },
                    })
                  }}
                >
                  <TbTicketOff className="w-4 h-4"/>
                Abandonar
                </button>
              </DropdownMenuItem>
            )
        )

        }
        <DropdownMenuItem>
          <Link href={`/events/${title.replaceAll(" ", "-")}/info`} className="w-full flex items-center gap-x-2">
            <TbInfoSquare className="w-4 h-4"/>
            Información
          </Link>
        </DropdownMenuItem>
        {new Date(startDate) <= currentDate &&
          <DropdownMenuItem>
            <Link href={`/events/${title.replaceAll(" ", "-")}/scoreboard`} className="w-full flex items-center gap-x-2">
              <TbTimeline className="w-4 h-4"/>
              Resultados
            </Link>
          </DropdownMenuItem>
        }
        {new Date(endDate) <= currentDate &&
          <DropdownMenuItem className="flex items-center gap-x-2" disabled>
            <TbCertificate className="w-4 h-4"/>
            Certificado
          </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
