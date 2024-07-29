import { LineChart } from "@/components/app/teams/line-chart"
import { RadarChart } from "@/components/app/teams/radar-chart"
import { RadialChart } from "@/components/app/teams/radial-chart"
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
import { sql } from "drizzle-orm"
import { notFound } from "next/navigation"

export default async function Page({ params: { id } }) {
  const { data: user, status: status } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}?participations=true`
  ).then(res => res.json())

  if (status.code === 404) return notFound()

  const { data: ranking } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/scoreboard`
  ).then(res => res.json())
  const myranking = ranking.find(r => r.user.id === id)

  const __scoreboards = db.all(sql`
    SELECT e.title as event, c.title as challenge, c.points, c.difficulty, e.type, sc2.timestamp
    FROM (
      SELECT sc.event, sc.challenge, sc.user, MAX(sc.points) AS points2
      FROM scoreboards sc
      WHERE user = 'e19f7678-a990-4595-8ee3-a1faac3d5963'
      GROUP BY sc.event, sc.challenge, sc.user
    ) d
    INNER JOIN events e ON e.id = d.event
    INNER JOIN challenges c ON c.title = d.challenge
    INNER JOIN scoreboards sc2 ON sc2.event = d.event and sc2.challenge = d.challenge and sc2.user = d.user and d.points2 = sc2.points
    ORDER BY sc2.timestamp DESC;
  `)

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
        <p>{user.description}</p>
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
              <TableHead className="text-right">Puntos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {__scoreboards.map(scoreboard => (
              <TableRow key={scoreboard.invoice}>
                <TableCell className="font-medium">
                  {scoreboard.event}
                </TableCell>
                <TableCell>{scoreboard.challenge}</TableCell>
                <TableCell>
                  <time dateTime={scoreboard.timestamp} className="capitalize">
                    {formatter.format(new Date(scoreboard.timestamp))}
                  </time>
                </TableCell>
                <TableCell className="text-right font-mono text-xs">
                  +[{scoreboard.points}pts]
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
