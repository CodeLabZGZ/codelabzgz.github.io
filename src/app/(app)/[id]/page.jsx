import { LineChart } from "@/components/app/profile/line-chart"
import { RadarChart } from "@/components/app/profile/radar-chart"
import { RadialChart } from "@/components/app/profile/radial-chart"
import { Avatar } from "@/components/avatar"
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
import { db } from "@/db"
import { cn } from "@/lib/utils"
import axios from "axios"
import { sql } from "drizzle-orm"
import { notFound } from "next/navigation"

const options = { day: "numeric", month: "short", year: "numeric" }

export default async function Page({ params: { id } }) {
  const {
    data: { data: user }
  } = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}?participations=true`)
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
    })

  const {
    data: { data: ranking }
  } = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/users/scoreboard`)
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
    })
  const myranking = ranking.find(r => r.user.id === id)

  const __scoreboards = await db.all(
    sql`
    SELECT e.title as event, sc.challenge, c.points as cpoints, sc.points as spoints, sc.timestamp
    FROM scoreboards sc
    INNER JOIN challenges c ON c.title = sc.challenge
    INNER JOIN events e ON e.slug = sc.event
    WHERE sc.user = ${id}
    ORDER BY sc.timestamp DESC
    LIMIT 10;
  `
  )

  return (
    <div className="space-y-4">
      <section className="space-y-4">
        <div className="flex gap-x-4">
          <Avatar image={user.image} value={user.name} className="h-14 w-14" />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-medium">{user.name}</h1>
            {user.username && (
              <h2 className="text-muted-foreground">@{user.username}</h2>
            )}
          </div>
        </div>
        <p
          className={cn(
            "flex gap-x-4",
            user.description
              ? ""
              : "select-none items-center justify-center border-2 border-dashed p-6 text-sm text-muted-foreground"
          )}
        >
          {user.description
            ? user.description
            : "Este usuario es muy vago y no ha puesto una descripción."}
        </p>
      </section>
      <section className="grid grid-cols-3 gap-x-4">
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>
              {myranking ? `# ${myranking.rank}` : "Sin calsificación"}
            </CardTitle>
            <CardDescription>Puesto global</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>
              {myranking ? myranking.points : "Sin calsificación"}
            </CardTitle>
            <CardDescription>Puntuación total</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 rounded">
          <CardHeader>
            <CardTitle>{user.participations.length}</CardTitle>
            <CardDescription>Eventos totales</CardDescription>
          </CardHeader>
        </Card>
      </section>
      <section className="grid grid-cols-2 gap-x-4">
        <RadarChart />
        <RadialChart />
      </section>
      <section>
        <LineChart />
      </section>
      <section>
        <div className="w-full p-4">
          <h3 className="text-center text-base font-bold">
            Calendario de actividades
          </h3>
          <p className="text-center text-xs text-muted-foreground">
            Comprueba tu actividad diaria en Codelab.
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evento</TableHead>
              <TableHead>Reto</TableHead>
              <TableHead className="sr-only">Fecha</TableHead>
              <TableHead className="text-nowrap text-right">
                Puntos (C)
              </TableHead>
              <TableHead className="text-nowrap text-right">
                Puntos (S)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {__scoreboards.map(scoreboard => (
              <TableRow key={scoreboard.invoice}>
                <TableCell className="w-[300px] font-medium">
                  {scoreboard.event}
                </TableCell>
                <TableCell className="w-[300px]">
                  {scoreboard.challenge}
                </TableCell>
                <TableCell>
                  <time
                    dateTime={scoreboard.timestamp}
                    className="text-nowrap capitalize"
                  >
                    {formatDate({
                      date: new Date(scoreboard.timestamp),
                      options
                    })}
                  </time>
                </TableCell>
                <TableCell className="text-nowrap text-right font-mono text-xs">
                  +[{scoreboard.cpoints}] pts
                </TableCell>
                <TableCell className="text-nowrap text-right font-mono text-xs">
                  +[{formatNumber(scoreboard.spoints)}] pts
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
