"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { DataTableColumnHeader } from "./data-table-column-header"

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const { logo, motto } = row.original
      const letters = row
        .getValue("name")
        .match(/\w+(?:-\w+)*/g)
        .slice(0, 2)
        .map(w => w[0])

      return (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={logo} alt="@shadcn" />
            <AvatarFallback className="uppercase">{letters}</AvatarFallback>
          </Avatar>
          <div className="flex max-w-[400px] flex-col gap-y-1 truncate">
            <span className="font-medium">{row.getValue("name")}</span>
            <span className="text-xs text-muted-foreground">{motto}</span>
          </div>
        </div>
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
    accessorKey: "members",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Miembros" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.getValue("members") || 0}</div>
    }
  },
  {
    accessorKey: "podiums",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Podios" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.getValue("podiums") || 0}</div>
    }
  }
]
