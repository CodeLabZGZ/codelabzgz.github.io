import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { members, scoreboards } from "db/schema"

import All from "./all"
import { CreateTeam } from "@/components/app/forms/create-team"
import MyTeams from "./my-teams"
import { auth } from "auth"
import { columns } from "@/components/app/tables/teams/columns"
import { db } from "db"
import deepMapValues from "just-deep-map-values"
import groupBy from "just-group-by"
import map from "just-map-values"
import { sql } from "drizzle-orm"

export default async function Page () {
  const { user } = await auth()

  const rankings = await db.all(sql`
    SELECT team, event, SUM(points) AS total_points
    FROM (
        SELECT team, event, challenge, points, ROW_NUMBER() OVER (PARTITION BY event ORDER BY points DESC) AS row_num
        FROM ${scoreboards}
    )
    WHERE row_num <= 3
    GROUP BY team, event
    ORDER BY event, total_points DESC
  `)

  let records = await db.query.teams.findMany({ with: { members, scoreboards } })
  records = records.map(record => {
    const ownership = record.members.find(m => m.user === user.id)

    // Best solution for each challenge
    const scoreboards = map(
      groupBy(record.scoreboards, ({ event }) => event),
      (value, key, obj) => deepMapValues(
        groupBy(value, ({ challenge }) => challenge),
        (history) => {
          if (!Array.isArray(history) || history.length === 0) return null
          return Math.max(...history.map(item => Number(item.points)))
        }
      )
    )

    // Sum of the best scores for each challenge
    const points = map(
      scoreboards,
      (value, key, obj) => Object.values(value).reduce((prev, next) => prev + next, 0)
    )

    const awards = rankings.reduce((prev, next) => {
      if (next.team === record.name) return prev + 1
      return prev
    }, 0)

    return ownership
      ? {
        ...record,
        ...ownership,
        scoreboards,
        members: record.members.length,
        points,
        awards
      }
      : {
        ...record,
        scoreboards,
        members: record.members.length,
        points,
        awards
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
