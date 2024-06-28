"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { formatNumber } from "@/lib/utils"
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
    accessorKey: "participant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-1.5">
          <span className="min-w-[200px] max-w-[500px] truncate font-medium">
            {row.getValue("participant")}
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
      <DataTableColumnHeader column={column} title="Puntos" />
    ),
    cell: ({ row }) => {
      return (
        <TooltipProvider className="col-span-1 mx-auto">
          <Tooltip>
            <TooltipTrigger>
              <span className="text-muted-foreground">
                {formatNumber(row.getValue("total_points"))}
              </span>
            </TooltipTrigger>
            <TooltipContent className="font-mono">
              {row
                .getValue("total_points")
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "challenges_solved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Retos" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center capitalize">
          <span>{row.getValue("challenges_solved")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  }
]
