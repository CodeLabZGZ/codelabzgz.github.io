"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { TbUserMinus, TbUserPlus } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

export function DataTableRowActions({ row }) {
  const { id, slug } = row.original

  const { data: session } = useSession()

  const handleAccept = e => {
    e.preventDefault()

    const body = { userId: session?.user.id, reqId: id }

    // accept the request
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${slug}/request`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (!res.ok) throw Error("status")
        return res.json()
      })
      .then(() => {
        toast.message(`Se ha añadido a name al equipo.`)
      })
      .catch(() => {
        toast.error(`Error: name`)
      })
  }

  const handleReject = e => {
    e.preventDefault()

    if (!slug) toast.error("¡No hay ningún equipo seleccionado!")

    const searchParams = new URLSearchParams({
      userId: session?.user.id,
      reqId: id
    })

    // accept the request
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/teams/${slug}/request?${searchParams}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => {
        if (!res.ok) throw Error("status")
        return res.json()
      })
      .then(() => {
        toast.message(`Se ha eliminado a name del equipo.`)
      })
      .catch(() => {
        toast.error(`Error: name`)
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
        <DropdownMenuItem
          className="flex w-full cursor-pointer items-center gap-x-2"
          onClick={handleAccept}
        >
          <TbUserPlus className="h-4 w-4" />
          Aceptar
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex w-full cursor-pointer items-center gap-x-2"
          onClick={handleReject}
        >
          <TbUserMinus className="h-4 w-4" />
          Rechazar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}