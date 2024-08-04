"use client"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { TbChevronLeft as ChevronLeft } from "react-icons/tb"

export function DataTableToolbar({ table, participating, slug }) {
  return (
    <div className="flex items-center justify-between gap-x-2">
      {participating && (
        <Link
          href={`/events/${slug}`}
          className={buttonVariants({
            variant: "outline",
            size: "icon"
          })}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Link>
      )}
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Buscar participante..."
          value={table.getColumn("participant")?.getFilterValue() ?? ""}
          onChange={event =>
            table.getColumn("participant")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  )
}
