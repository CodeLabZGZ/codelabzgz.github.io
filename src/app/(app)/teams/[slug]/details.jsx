import { LineChart } from "@/components/app/profile/line-chart"
import { RadarChart } from "@/components/app/profile/radar-chart"
import { RadialChart } from "@/components/app/profile/radial-chart"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import {
  TbBrandDiscord as Discord,
  TbMail as Mail,
  TbBrandTwitter as Twitter,
  TbWorld as World
} from "react-icons/tb"

const scoreboards = [
  {
    event: "INV001",
    date: "2024-05-01",
    rank: 2
  },
  {
    event: "INV002",
    date: "2024-05-01",
    rank: 1
  },
  {
    event: "INV003",
    date: "2024-05-01",
    rank: 30
  },
  {
    event: "INV004",
    date: "2024-05-01",
    rank: 4
  }
]

export default function Details() {
  const opciones = { day: "numeric", month: "short", year: "numeric" }
  const formatter = new Intl.DateTimeFormat("es-ES", opciones)

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-4 gap-x-4">
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle># 813</CardTitle>
            <CardDescription>Puesto global</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>60</CardTitle>
            <CardDescription>Puntuación total</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>6</CardTitle>
            <CardDescription>Eventos totales</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>6</CardTitle>
            <CardDescription>Podeos totales</CardDescription>
          </CardHeader>
        </Card>
      </section>
      <div className="grid grid-cols-2 gap-x-16">
        <section className="flex gap-x-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis
          sapien sem. Nam vulputate gravida metus et viverra. Morbi et faucibus
          odio. Vestibulum convallis libero in commodo pharetra. Curabitur
          mattis ornare mauris in mollis.
        </section>
        <section className="flex flex-col gap-y-2">
          <a
            href=""
            className="flex items-center gap-x-2 hover:underline hover:underline-offset-4"
          >
            <Twitter className="h-5 w-5" />
            @codelabzgz
          </a>
          <a
            href=""
            className="flex items-center gap-x-2 hover:underline hover:underline-offset-4"
          >
            <Discord className="h-5 w-5" />
            codelab
          </a>
          <a
            href=""
            className="flex items-center gap-x-2 hover:underline hover:underline-offset-4"
          >
            <World className="h-5 w-5" />
            codelab.dev
          </a>
          <a
            href=""
            className="flex items-center gap-x-2 hover:underline hover:underline-offset-4"
          >
            <Mail className="h-5 w-5" />
            hi@codelab.dev
          </a>
        </section>
      </div>
      <section className="grid grid-cols-2 gap-x-4">
        <RadarChart />
        <RadialChart />
      </section>
      <section>
        <LineChart />
      </section>
      <div className="grid grid-cols-2 gap-x-8">
        <section>
          <div className="w-full p-4">
            <h3 className="text-center text-base font-bold">
              Próximos eventos
            </h3>
            <p className="text-center text-xs text-muted-foreground">
              Comprueba los eventos en los participará el equipo.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sr-only" />
                <TableHead className="sr-only text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreboards.map(scoreboard => (
                <TableRow key={scoreboard.invoice} className="group">
                  <TableCell className="font-medium">
                    {scoreboard.event}
                  </TableCell>
                  <TableCell className="cursor-default text-right font-mono text-xs group-hover:underline group-hover:underline-offset-4">
                    <time dateTime={scoreboard.date} className="capitalize">
                      {formatter.format(new Date(scoreboard.date))}
                    </time>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <section>
          <div className="w-full p-4">
            <h3 className="text-center text-base font-bold">Eventos pasados</h3>
            <p className="text-center text-xs text-muted-foreground">
              Comprueba la actividad pasada del equipo.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sr-only" />
                <TableHead className="sr-only text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreboards.map(scoreboard => (
                <TableRow key={scoreboard.invoice} className="group">
                  <TableCell className="font-medium">
                    {scoreboard.event}
                  </TableCell>
                  <TableCell className="cursor-default text-right font-mono text-xs group-hover:underline group-hover:underline-offset-4">
                    Rank {scoreboard.rank}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  )
}
