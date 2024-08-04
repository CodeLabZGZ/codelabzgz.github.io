import { auth } from "@/auth"
import { getContent } from "@/lib/fetchers"
import axios from "axios"
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
  const data = await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}?populate=true&participations=true&challenges=true`
    )
    .then(({ data }) => {
      const participation = data["data"].participations.find(
        ({ user }) => user.id === session?.user.id
      )
      if (!participation) return notFound()

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
      return data.data
    })
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
    })

  const ranking = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}/scoreboard`)
    .then(({ data: res }) => {
      const ranking = groupByParticipant(res.data)
      return ranking.find(r => r.participant.id === data.participant.id)
    })
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
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
