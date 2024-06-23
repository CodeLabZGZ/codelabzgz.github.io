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

export function DataTableRowActions ({ row }) {
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
          className="w-full flex items-center gap-x-2 cursor-pointer"
          onClick={() => {}}
        >
            <TbUserPlus className="w-4 h-4"/>
            Aceptar
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="w-full flex items-center gap-x-2 cursor-pointer"
          onClick={() => {}}
        >
            <TbUserMinus className="w-4 h-4"/>
            Rechazar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
