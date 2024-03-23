"use client"

import { TbFlag, TbLock, TbLockOpen } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { Cross2Icon } from "@radix-ui/react-icons"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "@/components/ui/input"

export function DataTableToolbar ({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Buscar eventos..."
          value={(table.getColumn("title")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Visibilidad"
            options={[
              {
                label: "Público",
                value: "public",
                icon: TbLockOpen
              },
              {
                label: "Privado",
                value: "private",
                icon: TbLock

              }
            ]}
          />
        )}
        {table.getColumn("format") && (
          <DataTableFacetedFilter
            column={table.getColumn("format")}
            title="Formato"
            options={[
              {
                label: "Hackathon",
                value: "hackathon",
                icon: TbFlag
              }
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
