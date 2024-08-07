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
import { cn, formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
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

const options = { day: "numeric", month: "short", year: "numeric" }

export default async function Details({ slug }) {
  const team = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teams/${slug}?participations=true`
  )
    .then(res => res.json())
    .then(({ data, status }) => {
      if (status.code === 404) return notFound()
      return data
    })
    .catch(err => console.error(err.message))

  const ranking = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teams/scoreboard`
  )
    .then(res => res.json())
    .then(({ data, status }) => {
      if (status.code === 404) return notFound()
      return data?.find(r => r.team.slug === slug)
    })
    .catch(err => console.error(err.message))

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-3 gap-x-4">
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>
              {ranking ? `# ${ranking.rank}` : "Sin clasificación"}
            </CardTitle>
            <CardDescription>Puesto global</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>
              {ranking ? `${ranking.points}` : "Sin clasificación"}
            </CardTitle>
            <CardDescription>Puntuación total</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>{team.participations.length}</CardTitle>
            <CardDescription>Eventos totales</CardDescription>
          </CardHeader>
        </Card>
      </section>
      <div className="grid grid-cols-2 gap-x-4 py-2">
        <section
          className={cn(
            "flex gap-x-4",
            team.description
              ? ""
              : "select-none items-center justify-center border-2 border-dashed p-6 text-sm text-muted-foreground"
          )}
        >
          {team.description
            ? team.description
            : "Este equipo es muy vago y no ha puesto una descripción."}
        </section>
        <section className="flex flex-col items-start gap-y-2">
          {team.twitterVisibility === "public" && team.twitter && (
            <a
              href={team.twitter}
              className="flex items-center gap-x-2 hover:underline hover:underline-offset-4"
            >
              <Twitter className="h-5 w-5" />
              {team.twitter}
            </a>
          )}
          {team.discordVisibility === "public" && team.discord && (
            <a
              href={team.discord}
              className="flex items-center gap-x-2 hover:underline hover:underline-offset-4"
            >
              <Discord className="h-5 w-5" />
              {team.discord}
            </a>
          )}
          {team.websiteVisibility === "public" && team.website && (
            <a
              href={team.website}
              className="flex items-center gap-x-2 hover:underline hover:underline-offset-4"
            >
              <World className="h-5 w-5" />
              {team.website}
            </a>
          )}
          {team.emailVisibility === "public" && team.email && (
            <a
              href={`mailto:${team.email}`}
              className="flex items-center gap-x-2 hover:underline hover:underline-offset-4"
            >
              <Mail className="h-5 w-5" />
              {team.email}
            </a>
          )}
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
                      {formatDate({ date: new Date(scoreboard.date), options })}
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
