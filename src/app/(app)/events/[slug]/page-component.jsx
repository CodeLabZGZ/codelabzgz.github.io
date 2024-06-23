"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { DownloadIcon, UploadIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
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

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"

function formatNumber (num) {
  const units = [{ value: 1e12, suffix: "T" }, { value: 1e9, suffix: "B" }, { value: 1e6, suffix: "M" }, { value: 1e3, suffix: "K" }]
  const result = units.find(u => num >= u.value)
  return result ? (num / result.value).toFixed(1).replace(/\.0$/, "") + " " + result.suffix : num.toString()
}

export default function PageComponent ({ values, event }) {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(null)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="grid grid-cols-2 mb-4">
        <div className="col-span-1 flex items-center gap-x-2.5">
          <Avatar>
            <AvatarImage src="#" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="">Canarios Navegantes</span>
            <span className="text-xs text-muted-foreground">7 miembros</span>
          </div>
        </div>
        <div className="col-span-1 grid grid-cols-3">
          <div className="col-span-1 flex flex-col items-center gap-x-2.5 mx-auto">
            <span className="text-muted-foreground">9.º</span>
            <span className="text-xs uppercase">puesto</span>
          </div>
          <TooltipProvider className="col-span-1 mx-auto">
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
          <div className="col-span-1 flex items-center justify-between mx-auto">
            <div className="flex flex-col items-center gap-x-2.5">
              <span className="text-muted-foreground"> 0 / 9</span>
              <span className="text-xs uppercase">retos</span>
            </div>
          </div>
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
          {values?.map(({frontmatter: {title, points,  difficulty}}, index) => (
            <TableRow 
              key={title} 
              onClick={() => {
                setIsOpen(true)
                setActive(values[index])
              }} 
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>{points}</TableCell>
              <TableCell>{difficulty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SheetContent side="left" className="h-full flex flex-col overflow-y-hidden min-w-[30%]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-x-2">
            {active?.frontmatter?.title}
            <Badge variant="secondary" className="uppercase cursor-default">
            {active?.frontmatter?.difficulty}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            {active?.frontmatter?.description}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto markdown-body">
          {active?.content}
        </div>
        <SheetFooter className="w-full flex items-center">
          <Link 
            href="/"
            className={buttonVariants({ size: "sm", variant: "outline", className: "gap-1.5" })}
          >
            <DownloadIcon className="w-4 h-4"/>
            Descargar plantilla
          </Link>
          <Button
            onClick={() => {
              console.log({
                event: event,
                challenge: active?.slug
              })
            }}
            size="sm"
            className="gap-1.5"
          >
            <UploadIcon className="w-4 h-4"/>
            Subir solución
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
