import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { count, eq } from "drizzle-orm"
import { members, teams } from "db/schema"

import All from "./all"
import { CreateTeam } from "@/components/app/forms/create-team"
import MyTeams from "./my-teams"
import { auth } from "auth"
import { columns } from "@/components/app/tables/teams/columns"
import { db } from "db"

export default async function Page () {
  const { user } = await auth()

  const infoTeams = await db
    .select()
    .from(teams)

  const numMembers = await db
    .select({
      team: members.team,
      members: count(members.userId)
    })
    .from(members)
    .groupBy(members.team)

  const userTeams = await db
    .select()
    .from(members)
    .where(eq(members.userId, user.id))

  const records = infoTeams.map(team => {
    return {
      ...team,
      members: numMembers.find(r => r.team === team.name).members,
      role: userTeams.find(r => r.team === team.name)?.role,
      awards: 0
    }
  })

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
        <CreateTeam />
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
