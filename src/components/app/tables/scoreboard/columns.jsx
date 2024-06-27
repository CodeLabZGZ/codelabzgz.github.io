"use client"

import { DataTableColumnHeader } from "./data-table-column-header"

export const columns = [
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Puesto" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("position")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "team",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const { visibility } = row.original
      return (
        <div className="flex items-center space-x-1.5">
          <span className="min-w-[200px] max-w-[500px] truncate font-medium">
            {row.getValue("team")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "total_points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Puntos"/>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {row.getValue("total_points")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "challenges",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Retos" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center capitalize">
          <span>{row.getValue("challenges")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  }
]
