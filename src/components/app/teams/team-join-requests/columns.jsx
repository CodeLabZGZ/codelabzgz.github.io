"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card"
import React from "react"

import { CalendarIcon } from "@radix-ui/react-icons"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

/**
 * A hook
 * @param {String} teamId The id of the team
 * @returns
 */
export function useJoinRequestColumns(teamId) {
  return React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombre" />
        ),
        cell: ({ row }) => {
          const { image, name, username, status, updatedAt } = row.original
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
                    <h4 className="text-sm font-semibold">{username}</h4>
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
        accessorKey: "date",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Fecha" />
        ),
        cell: ({ row }) => {
          const { createdAt } = row.original

          return (
            <div className="flex items-center capitalize">
              {new Date(createdAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}
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
          return <div className="w-[100px]">{row.getValue("events") || 0}</div>
        }
      },
      {
        accessorKey: "points",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Puntos" />
        ),
        cell: ({ row }) => {
          return <div className="w-[100px]">{row.getValue("points") || 0}</div>
        }
      },
      {
        accessorKey: "awards",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Podios" />
        ),
        cell: ({ row }) => {
          return <div className="w-[100px]">{row.getValue("awards") || 0}</div>
        }
      },
      {
        id: "actions",
        cell: ({ row }) =>
          row.original.role !== "admin" && (
            <DataTableRowActions row={row} teamId={teamId} />
          )
      }
    ],
    [teamId]
  )
}
