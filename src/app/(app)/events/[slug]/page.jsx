"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"

import { useState } from "react"

const challenges = [
  {
    title: "break the the door",
    points: "200",
    difficulty: "medium"
  },
  {
    title: "broken auth",
    points: "150",
    difficulty: "easy"
  }
]

function formatNumber (num) {
  const units = [{ value: 1e12, suffix: "T" }, { value: 1e9, suffix: "B" }, { value: 1e6, suffix: "M" }, { value: 1e3, suffix: "K" }]
  const result = units.find(u => num >= u.value)
  return result ? (num / result.value).toFixed(1).replace(/\.0$/, "") + " " + result.suffix : num.toString()
}

export default function Page () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2.5">
          <Avatar>
            <AvatarImage src="#" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="">Canarios Navegantes</span>
            <span className="text-xs text-muted-foreground">7 miembros</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-1/3">
          <div className="flex flex-col items-center gap-x-2.5">
            <span className="text-muted-foreground">9.º</span>
            <span className="text-xs uppercase">puesto</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center gap-x-2.5">
                  <span className="text-muted-foreground">{formatNumber(200000000000)}</span>
                  <span className="text-xs uppercase">puntos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-mono">
                {"200000000000".toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Retos</TableHead>
            <TableHead>Puntos</TableHead>
            <TableHead>Dificultad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {challenges.map(({title, points, difficulty}) => (
            <TableRow key={title} onClick={() => setIsOpen(true)} className="cursor-pointer">
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>{points}</TableCell>
              <TableCell>{difficulty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
