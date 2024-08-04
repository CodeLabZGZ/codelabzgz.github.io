import { auth } from "@/auth"
import { columns } from "@/components/app/events/scoreboard/columns"
import { DataTable } from "@/components/app/events/scoreboard/data-table"
import axios from "axios"
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
  const session = await auth()
  const scoreboard = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}/scoreboard`)
    .then(({ data }) => data.data)
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
    })

  const participating = await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}?participations=true`
    )
    .then(({ data }) => {
      return (
        data.data.participations.findIndex(
          r => r.user === session?.user?.id
        ) !== -1
      )
    })
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
    })

  return (
    <DataTable
      columns={columns}
      data={groupByParticipant(scoreboard)}
      participating={participating}
      slug={slug}
    />
  )
}
