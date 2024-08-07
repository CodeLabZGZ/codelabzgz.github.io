"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card"

import { CalendarIcon } from "@radix-ui/react-icons"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const { image, name, status, updatedAt } = row.original.user
      const letters = name
        .match(/\w+(?:-\w+)*/g)
        .slice(0, 2)
        .map(w => w[0])

      return (
        <HoverCard className="max-w-[400px]">
          <HoverCardTrigger asChild>
            <span className="font-medium underline-offset-4 hover:underline">
              {name}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-start space-x-4">
              <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback>{letters}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{name}</h4>
                <p className="text-sm">{status}</p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Se unió en{" "}
                    {new Date(updatedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long"
                    })}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize">
          {row.getValue("role")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "rank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px] whitespace-nowrap">
          {row.getValue("rank") ?? "Sin clasificación"}
        </div>
      )
    }
  },
  {
    accessorKey: "points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Puntos" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.getValue("points")}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { role, whoami } = row.original
      const show = role !== "admin" && whoami === "admin"
      return show ? <DataTableRowActions row={row} /> : null
    }
  }
]
