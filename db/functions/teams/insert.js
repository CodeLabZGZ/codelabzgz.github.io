import { db } from "@/db"
import { ConflictException, HTTPException } from "@/lib/api-errors"
import { members, teams } from "@/schemas"

export const insert = async ({ id, values }) => {
  const promise = new Promise(async resolve => {
    await db.transaction(async tx => {
      tx.insert(teams)
        .values(values)
        .returning()
        .then(async teams => {
          await tx
            .insert(members)
            .values({ user: id, team: teams[0].slug, role: "admin" })
            .catch(async _ => {
              tx.rollback()
              throw new ConflictException()
            })

          resolve(teams[0])
        })
        .catch(err => {
          console.log(err)
          if (err.message.includes("UNIQUE constraint failed")) {
            throw new ConflictException()
          }
          throw new HTTPException(500, "")
        })
    })
  })

  const data = await promise()
  console.log(data)
  return data
}
