import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { columns } from "@/components/app/teams/columns"
import { CreateTeam } from "@/components/app/teams/create-team"
import { JoinTeam } from "@/components/app/teams/join-team"
import { auth } from "auth"
import axios from "axios"
import All from "./all"
import MyTeams from "./my-teams"

export default async function Page() {
  const { user } = await auth()

  const test = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teams?members=true`
  )
    .then(res => res.json())
    .catch(err => console.error(err.message))

  console.log(test)

  const records = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/teams?members=true`)
    .then(({ data }) => {
      return data.data
        .map(({ members, ...r }) => ({
          ...r,
          role: members.find(m => m.user === user.id)?.role,
          members: members.filter(({ role }) => role !== "pending").length
        }))
        .sort((a, b) => {
          const roleOrder = { admin: 1, member: 2, pending: 3 }
          const roleComparison =
            (roleOrder[a.role] || 4) - (roleOrder[b.role] || 4)
          if (roleComparison !== 0) return roleComparison
          return (a.rank || 0) - (b.rank || 0)
        })
    })
    .catch(err => console.error(err.message))

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
        <div className="flex items-center gap-x-2">
          <JoinTeam teams={records} />
          <CreateTeam />
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="my-teams">Mis equipos</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="all" className="space-y-4">
            <All columns={columns} values={records} />
          </TabsContent>
          <TabsContent value="my-teams" className="space-y-4">
            <MyTeams columns={columns} values={records.filter(t => t.role)} />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
