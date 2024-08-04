import { db } from "@/db"

export const getAll = async ({
  members,
  participations,
  scoreboards,
  populate,
  limit,
  offset
}) => {
  const data = await db.query.users.findMany({
    limit,
    offset,
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

  return data
}
