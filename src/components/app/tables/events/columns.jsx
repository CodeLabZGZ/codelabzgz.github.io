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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const { visibility } = row.original
      return (
        <div className="flex items-center space-x-1.5">
          {visibility === "public" ? (
            <TbLockOpen className="h-3.5 w-3.5" />
          ) : (
            <TbLock className="h-3.5 w-3.5" />
          )}
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
    accessorKey: "visibility",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Visibilidad"
        className="sr-only"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="sr-only flex items-center capitalize">
          {row.getValue("visibility")}
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
          <Badge variant="outline" className="text-xs">
            {row.getValue("format")}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
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

      const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

      return (
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex items-center gap-x-2">
              <div className="flex flex-col capitalize">
                <span className="whitespace-nowrap text-xs">
                  {formatDate({ date: startDate, options: opt1, timeZone })}
                </span>
                <span className="whitespace-nowrap text-xs">
                  {formatDate({ date: startDate, options: opt3, timeZone })}
                </span>
              </div>
              &rarr;
              <div className="flex flex-col capitalize">
                <span className="whitespace-nowrap text-xs">
                  {formatDate({
                    date: endDate,
                    options:
                      startDate.getFullYear() === endDate.getFullYear()
                        ? opt2
                        : opt1,
                    timeZone
                  })}
                </span>
                <span className="whitespace-nowrap text-xs">
                  {formatDate({ date: endDate, options: opt3, timeZone })}
                </span>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="text-xs">
              La fecha mostrada se basa en tu zona horaria que es{" "}
              <span className="font-bold">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </span>
              .
            </div>
          </HoverCardContent>
        </HoverCard>
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
