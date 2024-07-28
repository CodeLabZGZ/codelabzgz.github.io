import { db } from "@/db"
import { challenges, scoreboards, teams, users } from "@/schemas"
import { and, eq, isNull, sum } from "drizzle-orm"
import { union } from "drizzle-orm/sqlite-core"

export const getScoreboard = async ({ id, limit, offset }) => {
  const _users = db
    .select({
      participant: {
        id: users.id,
        image: users.image,
        name: users.name
      },
      points: sum(challenges.points)
    })
    .from(scoreboards)
    .innerJoin(challenges, eq(scoreboards.challenge, challenges.title))
    .innerJoin(users, eq(scoreboards.user, users.id))
    .where(and(eq(scoreboards.event, id), isNull(scoreboards.team)))
    .groupBy(users.id, users.image, users.name)

  const _teams = db
    .select({
      participant: {
        id: teams.slug,
        image: teams.image,
        name: teams.name
      },
      points: sum(challenges.points)
    })
    .from(scoreboards)
    .innerJoin(challenges, eq(scoreboards.challenge, challenges.title))
    .innerJoin(teams, eq(scoreboards.team, teams.slug))
    .where(eq(scoreboards.event, id))
    .groupBy(teams.slug, teams.image, teams.name)

  const data = await union(_users, _teams)
  return data
}
