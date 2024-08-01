"use client"

import "@/styles/github-dark.css"
import "@/styles/github-markdown.css"
import "@/styles/katex.css"

import { Avatar } from "@/components/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
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
import { formatNumber } from "@/lib/utils"
import { Link } from "next-view-transitions"
import { useState } from "react"
import {
  TbExternalLink as ExternalLink,
  TbUpload as Upload
} from "react-icons/tb"

const currentDate = new Date()

export default function PageComponent({ data, content, slug }) {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(null)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="mb-4 grid grid-cols-2">
        <div className="col-span-1 flex items-center gap-x-2.5">
          <Avatar
            image={data.participant.image}
            value={data.participant.name}
          />
          <div className="flex flex-col items-start">
            <span className="">{data.participant.name}</span>
          </div>
        </div>
        <div className="col-span-1 grid grid-cols-3">
          <div className="col-span-1 mx-auto flex cursor-default flex-col items-center gap-x-2.5">
            <span className="text-muted-foreground">
              {data.ranking ? `${data.ranking.rank}.º` : "---"}
            </span>
            <span className="text-xs uppercase">puesto</span>
          </div>
          <TooltipProvider className="col-span-1 mx-auto">
            <Tooltip>
              <TooltipTrigger className="cursor-default">
                <div className="flex flex-col items-center gap-x-2.5">
                  <span className="text-muted-foreground">
                    {data.ranking ? formatNumber(data.ranking.points) : "---"}
                  </span>
                  <span className="text-xs uppercase">puntos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-mono">
                {data.ranking
                  ? data.ranking.points
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : "---"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="col-span-1 mx-auto flex items-center justify-between">
            <div className="flex flex-col items-center gap-x-2.5">
              <span className="cursor-default text-muted-foreground">
                {
                  data.challenges.filter(({ scoreboards }) =>
                    scoreboards.some(
                      ({ user, team }) =>
                        user === data.participant.id ||
                        team === data.participant.id
                    )
                  ).length
                }
                /{data.challenges.length}
              </span>
              <span className="text-xs uppercase">retos</span>
            </div>
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>
          <Link
            href={`/events/${slug}/scoreboard`}
            className={buttonVariants({
              variant: "link",
              className: "flex items-center justify-center gap-x-2"
            })}
          >
            Ver resultados.
            <ExternalLink />
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
          {currentDate < new Date(data.startDate) ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="max-w-prose text-center font-medium"
              >
                Los retos se harán visibles una vez comience el evento.
              </TableCell>
            </TableRow>
          ) : (
            data.challenges?.map(({ title, points, difficulty }, index) => (
              <TableRow
                key={title}
                onClick={() => {
                  setIsOpen(true)
                  setActive(
                    content.find(
                      ({ frontmatter }) =>
                        frontmatter.title.toLowerCase() === title.toLowerCase()
                    )
                  )
                }}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">{title}</TableCell>
                <TableCell>{points}</TableCell>
                <TableCell>{difficulty}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <SheetContent
        side="left"
        className="flex h-full min-w-[30%] flex-col overflow-y-hidden"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-x-2">
            {active?.frontmatter?.title}
            <Badge variant="secondary" className="cursor-default uppercase">
              {active?.frontmatter?.difficulty}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            {active?.frontmatter?.description}
          </SheetDescription>
        </SheetHeader>
        <div className="markdown-body flex-grow overflow-y-auto">
          {active?.content}
        </div>
        <SheetFooter className="flex w-full items-center">
          {data.challenges.find(
            ({ title }) =>
              active?.frontmatter?.title.toLowerCase() === title.toLowerCase()
          )?.validator && (
            <Button onClick={() => {}} size="sm" className="gap-1.5">
              <Upload className="h-4 w-4" />
              Subir solución
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
