import { auth } from "@/auth"
import { getContent } from "@/lib/fetchers"
import { notFound } from "next/navigation"
import PageComponent from "./page-component"

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
  const { data, status } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}?populate=true&participations=true&challenges=true`
  ).then(async res => {
    const data = await res.json()
    const participation = data["data"].participations.find(
      ({ user }) => user.id === session?.user.id
    )
    data["data"]["participating"] = Boolean(participation)
    data["data"]["participant"] = {
      id: participation?.team
        ? participation?.team?.slug
        : participation?.user?.id,
      image: participation?.team
        ? participation?.team?.image
        : participation?.user?.image,
      name: participation?.team
        ? participation?.team?.name
        : participation?.user?.name
    }
    return { ...data }
  })

  if (status.code === 404 || !data.participating) return notFound()

  const ranking = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/advent-university-24/scoreboard`
  ).then(async res => {
    const { data: scoreboard } = await res.json()
    const ranking = groupByParticipant(scoreboard)
    return ranking.find(r => r.participant.id === data.participant.id)
  })

  const { data: content } = await getContent(`events/${slug}`)

  return (
    <div className="text-white">
      <PageComponent
        data={{ ...data, ranking }}
        content={content}
        slug={slug}
      />
    </div>
  )
}
