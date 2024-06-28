import { and, eq, sql } from "drizzle-orm"
import { events, members, participations, teams } from "@/schema"

import PageComponent from "./page-component"
import { auth } from "@/auth"
import { db } from "@/db"
import { getContent } from "./fetchers"
import { notFound } from "next/navigation"

export default async  function Page ({params: { slug }}) {
  const { user } = await auth()
  const [ event ] = await db.select({
    id: events.id,
    team: {
      ...teams,
      membersPlaying: sql`COUNT(${participations.user})`,
      members: sql`(
        SELECT COUNT(*)
        FROM ${members} AS m
        WHERE m.team = ${teams.name}
        GROUP BY m.team
      )`
    },
    participating: sql`MAX(CASE WHEN ${participations.user} = ${user.id} THEN 1 ELSE 0 END)`,
  })
  .from(events)
  .innerJoin(participations, sql`${participations.event} = ${events.id}`)
  .innerJoin(teams, sql`${participations.team} = ${teams.name}`)
  .where(and(
    eq(events.title, slug.replaceAll("-", " ")),
    eq(participations.user, user.id)
  ))
  .groupBy(events.id, teams.name);

  const  { error, data: values} = await getContent(slug)
  if (!event || error || !event?.participating) return notFound()

  const [ record ] = db.all(sql`
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
    WHERE sbc.team = ${event.team.name}
    GROUP BY sbc.team
    ORDER BY position;
  `)

  return (
    <div className="text-white">
      <PageComponent 
        data={{
          ...event,
          position: record.position,
          challenges: record.challenges,
          total_points: record.total_points
        }}
        values={values.filter(v => v?.frontmatter?.title && v?.frontmatter?.title !== "overview")} 
        event={slug}
      />
    </div>
  )
}
