import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { users } from "@/schemas"
import { eq } from "drizzle-orm"

export const getOne = async ({
  id,
  members,
  participations,
  scoreboards,
  populate
}) => {
  const data = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      ...(members !== undefined && {
        members: {
          columns: {
            user: false
          },
          with: {
            ...(populate && {
              team: true
            })
          }
        }
      }),
      ...(participations !== undefined && {
        participations: {
          columns: {
            user: false
          },
          with: {
            ...(populate && {
              team: true
            }),
            ...(populate && {
              event: true
            })
          }
        }
      }),
      ...(scoreboards !== undefined && {
        scoreboards: {
          columns: {
            user: false
          },
          with: {
            ...(populate && {
              team: true
            }),
            ...(populate && {
              event: true
            }),
            ...(populate && {
              challenge: true
            })
          }
        }
      })
    }
  })

  if (!data) throw new NotFoundException()
  return data
}
