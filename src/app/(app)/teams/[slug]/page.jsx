import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { auth } from "@/auth"
import { Avatar } from "@/components/avatar"
import axios from "axios"
import { notFound } from "next/navigation"
import Details from "./details"
import JoinRequest from "./join-request"
import Players from "./players"
import Settings from "./settings"

function mergeData({ id, users, team }) {
  const usersMap = new Map(users.map(user => [user.user.id, user]))

  const mergedMembers = team.members.map(member => {
    const userId = member.user.id
    const userInfo = usersMap.get(userId)

    if (userInfo) {
      return {
        ...member,
        user: userInfo.user,
        points: userInfo.points,
        rank: userInfo.rank
      }
    }

    return member
  })

  return {
    ...team,
    members: mergedMembers.sort((a, b) => {
      const roleOrder = { admin: 1, member: 2, pending: 3 }
      const roleComparison = (roleOrder[a.role] || 4) - (roleOrder[b.role] || 4)
      if (roleComparison !== 0) return roleComparison
      return (a.rank || 0) - (b.rank || 0)
    }),
    whoami: mergedMembers.find(({ user }) => user.id === id)?.role
  }
}

export default async function Page({ params: { slug } }) {
  const session = await auth()
  const teams = await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/teams/${slug}?members=true&populate=true`
    )
    .then(({ data }) => data.data)
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
    })

  const ranking = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/users/scoreboard`)
    .then(({ data }) => data.data)
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
    })

  const team = mergeData({ id: session.user.id, users: ranking, team: teams })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
      </div>
      <div className="flex gap-x-4">
        <Avatar image={team.image} value={team.name} className="h-14 w-14" />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-medium">{team.name}</h1>
        </div>
      </div>
      <Tabs defaultValue="team-details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team-details">Detalles</TabsTrigger>
          <TabsTrigger value="team-players">Miembros</TabsTrigger>
          {team.whoami === "admin" && (
            <TabsTrigger value="settings">Ajustes</TabsTrigger>
          )}
          {["admin", "member"].includes(team.whoami) && (
            <TabsTrigger value="join-request">Solicitudes</TabsTrigger>
          )}
        </TabsList>
        <main>
          <TabsContent value="team-details" className="space-y-4">
            <Details slug={slug} />
          </TabsContent>
          <TabsContent value="team-players" className="space-y-4">
            <Players
              values={team.members
                .filter(({ role }) => role !== "pending")
                .map(row => ({ ...row, whoami: team.whoami, slug }))}
            />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Settings {...team} />
          </TabsContent>
          <TabsContent value="join-request" className="space-y-4">
            <JoinRequest
              values={team.members
                .filter(({ role }) => role === "pending")
                .map(row => ({ ...row, whoami: team.whoami, slug }))}
            />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
