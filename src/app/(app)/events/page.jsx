import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { events, participations } from "@/schema"

import { columns } from "@/components/app/tables/events/columns"
import { db } from "@/db"
import { auth } from "auth"
import { sql } from "drizzle-orm"
import Joined from "./joined"
import OnGoing from "./ongoing"
import Past from "./past"
import UpGoing from "./upgoing"

const currentDate = new Date()

export default async function Page() {
  const { user } = await auth()
  const records = await db
    .select({
      ...events,
      people: sql`COUNT(${participations.user})`,
      participating: sql`MAX(CASE WHEN ${participations.user} = ${user.id} THEN 1 ELSE 0 END)`
    })
    .from(events)
    .leftJoin(participations, sql`${participations.event} = ${events.id}`)
    .groupBy(events.id, ...Object.keys(events))
    .orderBy(events.startDate)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
      </div>
      <Tabs defaultValue="ongoing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ongoing">En curso</TabsTrigger>
          <TabsTrigger value="upgoing">Programados</TabsTrigger>
          <TabsTrigger value="joined">Participando</TabsTrigger>
          <TabsTrigger value="past">Pasados</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="ongoing" className="space-y-4">
            <OnGoing
              columns={columns}
              values={records.filter(
                e =>
                  new Date(e.startDate) <= currentDate &&
                  currentDate <= new Date(e.endDate)
              )}
            />
          </TabsContent>
          <TabsContent value="upgoing" className="space-y-4">
            <UpGoing
              columns={columns}
              values={records.filter(e => new Date(e.startDate) > currentDate)}
            />
          </TabsContent>
          <TabsContent value="joined" className="space-y-4">
            <Joined
              columns={columns}
              values={records.filter(
                e =>
                  e.participating &&
                  new Date(e.startDate) <= currentDate &&
                  currentDate <= new Date(e.endDate)
              )}
            />
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <Past
              columns={columns}
              values={records.filter(e => new Date(e.endDate) < currentDate)}
            />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
