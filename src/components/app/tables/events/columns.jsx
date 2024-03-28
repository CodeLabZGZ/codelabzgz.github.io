"use client"

import { TbLock, TbLockOpen } from "react-icons/tb"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const { type } = row.original
      return (
        <div className="flex items-center space-x-1.5">
          {type === "public"
            ? <TbLockOpen className="w-3.5 h-3.5" />
            : <TbLock className="w-3.5 h-3.5" />
          }
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visibilidad" className="sr-only"/>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize sr-only">
          {row.getValue("type")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "format",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Formato" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center capitalize">
          <Badge variant="outline" className="text-xs">{row.getValue("format")}</Badge>
        </div>
      )
    }
  },
  {
    accessorKey: "people",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asistentes" />
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
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lugar" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center capitalize">
          <span>{row.getValue("location")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate)
      const endDate = new Date(row.original.endDate)
      const opt1 = { day: "2-digit", month: "short", year: "numeric" }
      const opt2 = { day: "2-digit", month: "short" }
      const opt3 = { hour: "2-digit", minute: "2-digit", hour12: false }

      return (
        <div className="flex items-center gap-x-2">
          <div className="flex flex-col capitalize">
            <span className="text-xs whitespace-nowrap">
              {startDate.toLocaleString("es-ES", opt1)}
            </span>
            <span className="text-xs whitespace-nowrap">
              {startDate.toLocaleString("es-ES", opt3)}
            </span>
          </div>
          &rarr;
          <div className="flex flex-col capitalize">
            <span className="text-xs whitespace-nowrap">
              {endDate.toLocaleString("es-ES", startDate.getFullYear() === endDate.getFullYear() ? opt2 : opt1)}
            </span>
            <span className="text-xs whitespace-nowrap">
              {endDate.toLocaleString("es-ES", opt3)}
            </span>
          </div>
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
