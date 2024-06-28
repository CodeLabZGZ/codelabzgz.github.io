"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  TbDownload as Download,
  TbExternalLink as ExternalLink,
  TbUpload as Upload
} from "react-icons/tb";
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
  TableCaption,
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

import { Avatar } from "@/components/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatNumber } from "@/lib/utils"
import { useState } from "react"

export default function PageComponent ({ values, event, data }) {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(null)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="grid grid-cols-2 mb-4">
        <div className="col-span-1 flex items-center gap-x-2.5">
          <Avatar image={data.team.logo} value={data.team.name} />
          <div className="flex flex-col items-start">
            <span className="">{data.team.name}</span>
            <span className="text-xs text-muted-foreground">{data.team.membersPlaying} / {data.team.members} miembros</span>
          </div>
        </div>
        <div className="col-span-1 grid grid-cols-3">
          <div className="col-span-1 flex flex-col items-center gap-x-2.5 mx-auto">
            <span className="text-muted-foreground">{data.position}.º</span>
            <span className="text-xs uppercase">puesto</span>
          </div>
          <TooltipProvider className="col-span-1 mx-auto">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center gap-x-2.5">
                  <span className="text-muted-foreground">{formatNumber(data.total_points)}</span>
                  <span className="text-xs uppercase">puntos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-mono">
                {data.total_points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="col-span-1 flex items-center justify-between mx-auto">
            <div className="flex flex-col items-center gap-x-2.5">
              <span className="text-muted-foreground">{data.challenges}</span>
              <span className="text-xs uppercase">retos</span>
            </div>
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>
          <Link href={`/events/${event}/scoreboard`} className="flex items-center justify-center gap-x-2">
            Ver resultados resultados. 
            <ExternalLink/>
          </Link>
        </TableCaption>
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
            <Download className="w-4 h-4"/>
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
            <Upload className="w-4 h-4"/>
            Subir solución
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
