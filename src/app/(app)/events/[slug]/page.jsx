import { auth } from "@/auth"
import { db } from "@/db"
import { sql } from "drizzle-orm"
import { notFound } from "next/navigation"
import { getContent } from "./fetchers"
import PageComponent from "./page-component"

export default async function Page({ params: { slug } }) {
  const { user } = await auth()
  const [participant] = db.all(sql`
    SELECT
      e.id as event,
      COALESCE(t.name, u.name) AS participant,
      CASE
        WHEN t.name IS NOT NULL THEN 'team'
        ELSE 'user'
      END AS participant_type,
      CASE
        WHEN t.name IS NOT NULL THEN t.logo
        ELSE u.image
      END AS participant_image
    FROM participations p
    LEFT JOIN teams t ON p.team = t.name
    LEFT JOIN user u ON p.user = u.id
    LEFT JOIN events e ON e.id = p.event
    WHERE e.title = ${slug.replaceAll("-", " ")} AND p.user = ${user.id};
  `)

  const { error, data: values } = await getContent(slug)
  if (!participant || error) return notFound()

  const [info] = db.all(sql`
    SELECT
      COALESCE(p.team, u.name) AS participant,
      COALESCE(SUM(best_scores.points), 0) AS total_points,
      COALESCE(COUNT(DISTINCT best_scores.challenge), 0) AS challenges_solved,
      CASE WHEN p.team IS NOT NULL THEN 'team' ELSE 'user' END AS participant_type,
      ROW_NUMBER() OVER (ORDER BY SUM(best_scores.points) DESC, best_scores.timestamp) AS position
    FROM participations p
    LEFT JOIN (
      SELECT user, event, challenge, MAX(points) AS points, timestamp
      FROM scoreboards
      GROUP BY user, event, challenge
    ) AS best_scores ON p.user = best_scores.user AND p.event = best_scores.event
    INNER JOIN user u ON p.user = u.id 
    WHERE p.event = ${participant.event} AND participant = ${participant.participant}
    GROUP BY p.event, participant, participant_type
    ORDER BY total_points DESC;
  `)

  const [challenges] = db.all(sql`
    SELECT COUNT(*) AS challenges FROM challenges
    WHERE event = ${participant.event} GROUP BY event;
  `)

  return (
    <div className="text-white">
      <PageComponent
        slug={slug}
        data={{ ...participant, ...info, ...challenges }}
        values={values.filter(
          v => v?.frontmatter?.title && v?.frontmatter?.title !== "overview"
        )}
      />
    </div>
  )
}
