"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { TbUserMinus } from "react-icons/tb"

export function DataTableRowActions({ row }) {
  const { role } = row.original

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
          onClick={() => {}}
        >
          <TbUserMinus className="h-4 w-4" />
          Echar del equipo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
