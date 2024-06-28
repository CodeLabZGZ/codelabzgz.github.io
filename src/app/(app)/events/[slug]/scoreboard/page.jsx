import { DataTable } from "@/components/app/tables/scoreboard/data-table"
import { columns } from "@/components/app/tables/scoreboard/columns"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { events } from "@/schema"
import { notFound } from "next/navigation"
import { sql } from "drizzle-orm"

export default async function Page({ params: { slug } }) {
  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.title, slug.replaceAll("-", " ")))

  if (!event) return notFound()

  const records = db.all(sql`
    WITH ScoreByChallenge AS (
      SELECT
        COALESCE(sc.team, pt.team) AS team,
        COALESCE(sc.challenge, NULL) AS challenge,
        COALESCE(MAX(sc.points), 0) AS points
      FROM participations pt
      LEFT JOIN scoreboards sc ON pt.team = sc.team AND sc.event = ${event.id}
      WHERE pt.event = ${event.id}
      GROUP BY
        COALESCE(sc.team, pt.team),
        COALESCE(sc.challenge, 0)
    ),
    TotalChallenges AS (
      SELECT
        event,
        COUNT(c.title) AS total_challenges
      FROM challenges c
      WHERE event = ${event.id}
      GROUP BY event
    )
      
    SELECT
      ROW_NUMBER() OVER ( ORDER BY SUM(sbc.points) DESC ) AS position,
      sbc.team,
      SUM(sbc.points) AS total_points,
      CONCAT (COUNT(sbc.challenge), ' / ', tc.total_challenges) AS challenges
    FROM ScoreByChallenge sbc
    LEFT JOIN TotalChallenges tc
    GROUP BY sbc.team
    ORDER BY position;
  `)

  return <DataTable columns={columns} data={records} />
}
