import { columns } from "@/components/app/events/scoreboard/columns"
import { DataTable } from "@/components/app/events/scoreboard/data-table"
import { db } from "@/db"
import { events } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { notFound } from "next/navigation"

export default async function Page({ params: { slug } }) {
  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.title, slug.replaceAll("-", " ")))

  if (!event) return notFound()

  const records = db.all(sql`
    SELECT
      COALESCE(p.team, u.name) AS participant,
      COALESCE(SUM(best_scores.points), 0) AS total_points,
      COALESCE(COUNT(DISTINCT best_scores.challenge), 0) AS challenges_solved,
      CASE WHEN p.team IS NOT NULL THEN 'team' ELSE 'user' END AS participant_type,
      ROW_NUMBER() OVER (ORDER BY SUM(best_scores.points) DESC) AS position
    FROM participations p
    LEFT JOIN (
      SELECT user, event, challenge, MAX(points) AS points
      FROM scoreboards
      GROUP BY user, event, challenge
    ) AS best_scores ON p.user = best_scores.user AND p.event = best_scores.event
    INNER JOIN user u ON p.user = u.id 
    WHERE p.event = ${event.id}
    GROUP BY p.event, participant, participant_type
    ORDER BY total_points DESC;
  `)

  const [challenges] = db.all(sql`
    SELECT COUNT(*) AS challenges FROM challenges
    WHERE event = ${event.id} GROUP BY event;
  `)

  return (
    <DataTable
      columns={columns}
      data={records.map(i => ({ ...i, ...challenges }))}
    />
  )
}
