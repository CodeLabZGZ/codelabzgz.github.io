import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { teams } from "@/schemas"
import { eq } from "drizzle-orm"

export const getOne = async ({
  slug,
  members,
  participations,
  scoreboards,
  populate
}) => {
  const data = await db.query.teams.findFirst({
    where: eq(teams.slug, slug),
    with: {
      ...(members !== undefined && {
        members: {
          columns: {
            team: false
          },
          with: {
            ...(populate && {
              user: true
            })
          }
        }
      }),
      ...(participations !== undefined && {
        participations: {
          columns: {
            team: false
          },
          with: {
            ...(populate && {
              user: true
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
            team: false
          },
          with: {
            ...(populate && {
              user: true
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
