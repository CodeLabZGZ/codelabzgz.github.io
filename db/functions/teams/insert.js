import { db } from "@/db"
import { ConflictException, HTTPException } from "@/lib/api-errors"
import { members, teams } from "@/schemas"

export const insert = async ({ id, values }) => {
  const promise = new Promise(async resolve => {
    try {
      db.transaction(async tx => {
        const [team] = await tx.insert(teams).values(values).returning()
        await tx
          .insert(members)
          .values({ user: id, team: team.slug, role: "admin" })
          .catch(async _ => {
            tx.rollback()
            throw new ConflictException()
          })

        resolve(team)
      })
    } catch (error) {
      if (err.message.includes("UNIQUE constraint failed")) {
        throw new ConflictException()
      }
      throw new HTTPException(500, "")
    }
  })

  const data = await promise()
  return data
}
