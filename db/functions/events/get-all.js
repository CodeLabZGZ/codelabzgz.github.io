import { db } from "@/db"

export const getAll = async ({
  challenges,
  participations,
  scoreboards,
  populate,
  limit,
  offset
}) => {
  const data = await db.query.events.findMany({
    limit,
    offset,
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

  return data
}
