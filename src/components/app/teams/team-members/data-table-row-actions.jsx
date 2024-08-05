"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { TbUserMinus } from "react-icons/tb"
import { toast } from "sonner"

export function DataTableRowActions({ row }) {
  const router = useRouter()
  const { user, slug } = row.original

  const handleKick = e => {
    e.preventDefault()

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/teams/${slug}/members`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.id })
      }
    )

    toast.promise(promise, {
      loading: "Estamos procesando tu solicitud, espera un poco...",
      success: () => {
        router.refresh()
        return `Se ha eliminado a ${user.name} del equipo.`
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
          <span className="sr-only">Abrir menu </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-x-2 whitespace-nowrap"
          onClick={handleKick}
        >
          <TbUserMinus className="h-4 w-4" />
          Echar del equipo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
