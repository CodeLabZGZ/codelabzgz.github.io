"use client"

import { Input } from "@/components/ui/input"

export function DataTableToolbar({ table }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Buscar equipo..."
          value={table.getColumn("team")?.getFilterValue() ?? ""}
          onChange={event =>
            table.getColumn("team")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  )
}
