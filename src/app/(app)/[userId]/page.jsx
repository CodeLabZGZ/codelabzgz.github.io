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
import { users } from "@/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

const scoreboards = [
  {
    event: "INV001",
    challenge: "Paid",
    date: "2024-05-01",
    points: 50
  },
  {
    event: "INV002",
    challenge: "Pending",
    date: "2024-05-01",
    points: 20
  },
  {
    event: "INV003",
    challenge: "Unpaid",
    date: "2024-05-01",
    points: 30
  },
  {
    event: "INV004",
    challenge: "Paid",
    date: "2024-05-01",
    points: 25
  },
  {
    event: "INV005",
    challenge: "Paid",
    date: "2024-05-01",
    points: 25
  },
  {
    event: "INV006",
    challenge: "Pending",
    date: "2024-05-01",
    points: 30
  },
  {
    event: "INV007",
    challenge: "Unpaid",
    date: "2024-05-01",
    points: 40
  }
]

export default async function Page({ params: { userId } }) {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      image: true,
      name: true,
      username: true,
      description: true
    },
    where: eq(users.id, userId)
  })

  if (!user) return notFound()

  const opciones = { day: "numeric", month: "short", year: "numeric" }
  const formatter = new Intl.DateTimeFormat("es-ES", opciones)

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
      <section className="flex gap-x-4">
        <Card className="w-fit min-w-44 rounded">
          <CardHeader>
            <CardTitle># 813</CardTitle>
            <CardDescription>Puesto global</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-fit min-w-44 rounded">
          <CardHeader>
            <CardTitle>813</CardTitle>
            <CardDescription>Puntuación total</CardDescription>
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
            {scoreboards.map(scoreboard => (
              <TableRow key={scoreboard.invoice}>
                <TableCell className="font-medium">
                  {scoreboard.event}
                </TableCell>
                <TableCell>{scoreboard.challenge}</TableCell>
                <TableCell>
                  <time dateTime={scoreboard.date} className="capitalize">
                    {formatter.format(new Date(scoreboard.date))}
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
