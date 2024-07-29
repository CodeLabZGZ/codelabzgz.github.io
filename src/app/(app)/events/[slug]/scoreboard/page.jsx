import { columns } from "@/components/app/events/scoreboard/columns"
import { DataTable } from "@/components/app/events/scoreboard/data-table"
import { db } from "@/db"
import { events } from "@/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

function groupByParticipant(data) {
  const grouped = data.reduce((acc, item) => {
    const { participant, points, timestamp } = item
    const participantId = participant.id

    if (!acc[participantId]) {
      acc[participantId] = { participant, points: 0, timestamp: Infinity }
    }

    acc[participantId].points += points
    acc[participantId].timestamp = Math.min(
      acc[participantId].timestamp,
      timestamp
    )

    return acc
  }, {})

  return Object.values(grouped)
    .sort((a, b) => {
      if (b.points === a.points) return a.timestamp - b.timestamp // Orden ascendente por timestamp si los puntos son iguales
      return b.points - a.points // Orden descendente por puntos
    })
    .map((r, rank) => ({ rank: rank + 1, ...r }))
}

export default async function Page({ params: { slug } }) {
  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.title, slug.replaceAll("-", " ")))
  if (!event) return notFound()

  const { data: scoreboard } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}/scoreboard`
  ).then(res => res.json())

  return <DataTable columns={columns} data={groupByParticipant(scoreboard)} />
}
