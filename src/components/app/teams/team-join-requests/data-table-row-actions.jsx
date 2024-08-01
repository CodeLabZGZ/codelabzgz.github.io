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
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DataTableRowActions({ row }) {
  const router = useRouter()
  const { user, slug } = row.original

  const handleAccept = e => {
    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${slug}/members`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.id, role: "member" })
    })
      .then(res => {
        toast.message("Se ha añadido a name al equipo.")
        router.refresh()
        return res.json()
      })
      .catch(() => {
        toast.error(`Error: name`)
      })
  }

  const handleReject = e => {
    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${slug}/members`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.id })
    })
      .then(res => {
        toast.message("Se ha eliminado a name del equipo.")
        router.refresh()
        return res.json()
      })
      .catch(() => {
        toast.error("Error: name")
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
