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

export function DataTableRowActions({ row }) {
  const handleAccept = e => {
    e.preventDefault()
  }

  const handleReject = e => {
    e.preventDefault()
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
