import { db } from "@/db"

export const getAll = async ({
  members,
  participations,
  scoreboards,
  populate,
  limit,
  offset
}) => {
  const data = await db.query.teams.findMany({
    limit,
    offset,
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

  return data
}
