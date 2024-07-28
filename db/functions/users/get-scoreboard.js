import { db } from "@/db"
import { challenges, scoreboards, users } from "@/schemas"
import { desc, eq, sql, sum } from "drizzle-orm"

export const getScoreboard = async ({ limit, offset }) => {
  const data = await db
    .select({
      rank: sql`ROW_NUMBER() OVER (ORDER BY ${sum(challenges.points)} DESC, ${users.createdAt} ASC)`,
      user: {
        id: users.id,
        image: users.image,
        name: users.name,
        username: users.username,
        email: users.email
      },
      points: sum(challenges.points)
    })
    .from(scoreboards)
    .innerJoin(challenges, eq(scoreboards.challenge, challenges.title))
    .innerJoin(users, eq(scoreboards.user, users.id))
    .groupBy(scoreboards.event, scoreboards.challenge, scoreboards.user)
    .orderBy(desc(sum(challenges.points)), users.createdAt)
    .limit(limit)
    .offset(offset)

  return data
}
