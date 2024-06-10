"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const { logo, motto } = row.original
      const letters = row.getValue("name")
        .match(/\w+(?:-\w+)*/g)
        .slice(0, 2).map(w => w[0])

      return (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={logo} alt="@shadcn" />
            <AvatarFallback className="uppercase">{letters}</AvatarFallback>
          </Avatar>
          <div className="max-w-[400px] truncate flex flex-col gap-y-1">
            <span className="font-medium">
              {row.getValue("name")}
            </span>
            <span className="text-xs text-muted-foreground">
              {motto}
            </span>
          </div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha"/>
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
    accessorKey: "events",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eventos" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          {row.getValue("events")}
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
      return (
        <div className="w-[100px]">
          {row.getValue("points")}
        </div>
      )
    }
  },
  {
    accessorKey: "awards",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Podios" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          {row.getValue("awards")}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
