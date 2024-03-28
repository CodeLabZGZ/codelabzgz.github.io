import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

import All from "./all"
import { CreateTeam } from "@/components/app/forms/create-team"
import MyTeams from "./my-teams"
import { auth } from "auth"
import { columns } from "@/components/app/tables/teams/columns"
import { db } from "db"
import { members } from "db/schema"

export default async function Page () {
  const { user } = await auth()

  let records = await db.query.teams.findMany({ with: { members } })
  records = records.map(record => {
    const ownership = record.members.find(m => m.user === user.id)
    return ownership
      ? {
        ...record,
        ...ownership,
        members: record.members.length,
        awards: 0
      }
      : {
        ...record,
        members: record.members.length,
        awards: 0
      }
  })

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
        <CreateTeam id={user.id}/>
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
