"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card"
import { TbLock, TbLockOpen } from "react-icons/tb"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDate } from "@/lib/utils"

export const columns = [
  {
    accessorKey: "rank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Puesto" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("people")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const { visibility } = row.original
      return (
        <div className="flex items-center space-x-1.5">
          {visibility === "public"
            ? <TbLockOpen className="w-3.5 h-3.5" />
            : <TbLock className="w-3.5 h-3.5" />
          }
          <span className="min-w-[200px] max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Puntos"/>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize sr-only">
          {row.getValue("points")}
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
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
