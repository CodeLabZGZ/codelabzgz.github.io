import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { columns } from "@/components/app/teams/columns"
import { CreateTeam } from "@/components/app/teams/create-team"
import { JoinTeam } from "@/components/app/teams/join-team"
import { db } from "@/db"
import { auth } from "auth"
import { sql } from "drizzle-orm"
import All from "./all"
import MyTeams from "./my-teams"

export default async function Page() {
  const { user } = await auth()

  const records = db.all(sql`
    WITH
      TeamMembers AS (
        SELECT
          t.*,
          COUNT(m.user) AS members,
          MAX(CASE WHEN m.user = ${user.id} THEN m.role ELSE NULL END) AS role
        FROM teams t
        LEFT JOIN members m ON m.team = t.name
        GROUP BY t.name
      ),
      EventLeaderboard AS (
        SELECT team, MAX(total_points) AS points, COUNT(*) AS podiums
        FROM (
          SELECT 
            team, event, SUM(points) AS total_points, 
            ROW_NUMBER() OVER (PARTITION BY event ORDER BY SUM(points) DESC) AS position
          FROM scoreboards
          GROUP BY event, team
        ) EventScoreboard
        WHERE position <= 3
        GROUP BY team
      )

    SELECT tm.*, tm.members, el.points, el.podiums
    FROM TeamMembers tm
    LEFT JOIN EventLeaderboard el ON tm.name = el.team
    ORDER BY tm.role DESC, el.points DESC;
  `)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
        <div className="flex items-center gap-x-2">
          <JoinTeam userId={user.id} />
          <CreateTeam userId={user.id} />
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
