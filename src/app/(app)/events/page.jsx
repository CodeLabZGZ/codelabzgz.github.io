import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { count, eq } from "drizzle-orm"
import { events, participations } from "db/schema"

import Joined from "./joined"
import OnGoing from "./ongoing"
import Past from "./past"
import UpGoing from "./upgoing"
import { auth } from "auth"
import { columns } from "@/components/app/tables/events/columns"
import { db } from "db"

const fechaActual = new Date()

export default async function Page () {
  const { user } = await auth()

  const infoEvents = await db
    .select({
      events,
      people: count(participations.userId)
    })
    .from(events)
    .leftJoin(participations, eq(participations.eventId, events.id))
    .groupBy(events.id)

  const userActivity = await db
    .select()
    .from(participations)
    .where(eq(participations.userId, user.id))

  const records = infoEvents.map(({ events, people }) => {
    const userActivityRecord = userActivity.find(activity => activity.eventId === events.id)
    return {
      ...events,
      user: userActivityRecord ? userActivityRecord.userId : null,
      team: userActivityRecord ? userActivityRecord.team : null,
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
            <OnGoing columns={columns} values={records.filter(e => new Date(e.start_date) <= fechaActual && fechaActual <= new Date(e.end_date))} />
          </TabsContent>
          <TabsContent value="upgoing" className="space-y-4">
            <UpGoing columns={columns} values={records.filter(e => new Date(e.start_date) > fechaActual)} />
          </TabsContent>
          <TabsContent value="joined" className="space-y-4">
            <Joined columns={columns} values={records.filter(e => e.user)} />
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <Past columns={columns} values={records.filter(e => new Date(e.end_date) < fechaActual)} />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
