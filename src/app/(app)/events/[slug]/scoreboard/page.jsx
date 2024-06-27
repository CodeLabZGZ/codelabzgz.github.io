import { DataTable } from "@/components/app/tables/scoreboard/data-table"
import { columns } from "@/components/app/tables/scoreboard/columns"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { events } from "@/schema"
import { notFound } from "next/navigation"
import { sql } from "drizzle-orm"

export default async function Page({ params: {slug} }) {
  const [ event ] = await db.select().from(events).where(eq(events.title, slug.replaceAll("-", " ")))

  const records = db.all(sql`
      WITH ScoreByChallenge AS (
        SELECT
              sc.team,
              sc.challenge,
              MAX(sc.points) AS points
          FROM scoreboards sc
          WHERE sc.event = 1
          GROUP BY sc.team, sc.challenge
      ), TotalChallenges AS (
        SELECT event, COUNT(c.title) AS total_challenges
        FROM challenges c
        WHERE event = 1
        GROUP BY event
      )

      SELECT
          ROW_NUMBER() OVER (ORDER BY SUM(sbc.points) DESC) AS position,
          sbc.team,
          SUM(sbc.points) AS total_points,
          CONCAT(COUNT(sbc.challenge), ' / ', tc.total_challenges) AS challenges
      FROM ScoreByChallenge sbc
      LEFT JOIN TotalChallenges tc
      GROUP BY sbc.team
      ORDER BY position;
    `)
  console.log(records)

  if (!event || event.length === 0) return notFound()
    
  return <DataTable columns={columns} data={records}/>
}
