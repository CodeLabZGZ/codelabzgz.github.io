import { db } from "@/db"
import { challenges, scoreboards, teams } from "@/schemas"
import { desc, eq, sql, sum } from "drizzle-orm"

export const getScoreboard = async ({ limit, offset }) => {
  const data = await db
    .select({
      rank: sql`ROW_NUMBER() OVER (ORDER BY ${sum(challenges.points)} DESC, ${teams.createdAt} ASC)`,
      team: {
        slug: teams.slug,
        image: teams.image,
        name: teams.name,
        motto: teams.motto
      },
      points: sum(challenges.points)
    })
    .from(scoreboards)
    .innerJoin(challenges, eq(scoreboards.challenge, challenges.title))
    .innerJoin(teams, eq(scoreboards.team, teams.slug))
    .groupBy(scoreboards.event, scoreboards.challenge, scoreboards.team)
    .orderBy(desc(sum(challenges.points)), teams.createdAt)
    .limit(limit)
    .offset(offset)

  return data
}
