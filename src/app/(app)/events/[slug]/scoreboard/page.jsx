import { columns } from "@/components/app/events/scoreboard/columns"
import { DataTable } from "@/components/app/events/scoreboard/data-table"
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
  const { data: scoreboard, status } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/advent-university-24/scoreboard`
  ).then(res => res.json())

  if (status.code === 404 || !scoreboard) return notFound()

  return <DataTable columns={columns} data={groupByParticipant(scoreboard)} />
}
