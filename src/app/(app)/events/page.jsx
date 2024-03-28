import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

import Joined from "./joined"
import OnGoing from "./ongoing"
import Past from "./past"
import UpGoing from "./upgoing"
import { auth } from "auth"
import { columns } from "@/components/app/tables/events/columns"
import { db } from "db"
import { participations } from "db/schema"

const fechaActual = new Date()

export default async function Page () {
  const { user } = await auth()

  let records = await db.query.events.findMany({ with: { participations } })
  records = records.map(record => {
    const people = record.participations.length
    const item = record.participations.find(p => p.user === user.id)
    delete record.participations
    return item
      ? {
        ...record,
        people,
        user: item.user,
        team: item.team
      }
      : {
        ...record,
        people
      }
  })

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
      </div>
      <Tabs defaultValue="ongoing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ongoing">En curso</TabsTrigger>
          <TabsTrigger value="upgoing">Programados</TabsTrigger>
          <TabsTrigger value="joined">Participado</TabsTrigger>
          <TabsTrigger value="past">Pasados</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="ongoing" className="space-y-4">
            <OnGoing columns={columns} values={records.filter(e => new Date(e.startDate) <= fechaActual && fechaActual <= new Date(e.endDate))} />
          </TabsContent>
          <TabsContent value="upgoing" className="space-y-4">
            <UpGoing columns={columns} values={records.filter(e => new Date(e.startDate) > fechaActual)} />
          </TabsContent>
          <TabsContent value="joined" className="space-y-4">
            <Joined columns={columns} values={records.filter(e => e.user)} />
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <Past columns={columns} values={records.filter(e => new Date(e.endDate) < fechaActual)} />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
