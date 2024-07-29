import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { events } from "@/schemas"
import { eq } from "drizzle-orm"

export const getOne = async ({
  slug,
  challenges,
  participations,
  scoreboards,
  populate
}) => {
  const data = await db.query.events.findFirst({
    where: eq(events.slug, slug),
    with: {
      ...(challenges !== undefined && {
        challenges: {
          columns: {
            event: false
          },
          with: {
            ...(populate && {
              tests: true
            }),
            ...(populate && {
              scoreboards: true
            })
          }
        }
      }),
      ...(participations !== undefined && {
        participations: {
          columns: {
            event: false
          },
          with: {
            ...(populate && {
              team: true
            }),
            ...(populate && {
              user: true
            })
          }
        }
      }),
      ...(scoreboards !== undefined && {
        scoreboards: {
          columns: {
            event: false
          },
          with: {
            ...(populate && {
              team: true
            }),
            ...(populate && {
              user: true
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
