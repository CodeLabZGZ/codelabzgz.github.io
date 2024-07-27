import { db } from "@/db"
import { ConflictException, NotFoundException } from "@/lib/api-errors"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { members } from "@/schema"
import { and, eq, sql } from "drizzle-orm"

/**
 * Get all members of the team. Includes the information of each user
 * from the user table for display purposes.
 *
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function getHandler(request, context) {
  // Only authenticated users can accept members into the team
  // if (!request.auth) throw new UnauthorizedException()

  // team name
  const teamId = context.params.id

  // find if the user is an admin of the team
  const memberResult = await db.all(sql`
      WITH
        team_members AS (
          SELECT
            u.id, m.team, m.role
          FROM
            user u
            INNER JOIN members m ON u.id = m.user
          WHERE
            m.team = ${teamId}
        ),
        user_events AS (
          SELECT
            DISTINCT um.id AS user_id,
            COUNT(pt.user) AS events
          FROM
            team_members um
            LEFT JOIN participations pt ON um.id = pt.user
          GROUP BY
            user_id
          ORDER BY
            user_id ASC
        ),
        user_points AS (
          SELECT
            u.id AS user_id,
            COALESCE(points, 0) AS points
          FROM
            team_members u
            LEFT JOIN (
              SELECT
                scores.user,
                SUM(ch.points) AS points
              FROM
                (
                  SELECT sc.user, sc.challenge, sc.event, MAX(points) AS score
                  FROM scoreboards sc
                  GROUP BY sc.user, sc.challenge, sc.event
                ) scores
                INNER JOIN challenges ch ON scores.challenge = ch.title
                AND scores.event = ch.event
              GROUP BY
                scores.user
            ) up ON u.id = up.user
          ORDER BY
            user_id ASC
        ),
        user_podiums AS (
          SELECT
            tm.id AS user_id, COUNT(position) AS awards
          FROM
            team_members tm
            LEFT JOIN (
              SELECT
                ps.event, ps.challenge, ps.user, ps.best_points, ps.timestamp, ps.position
              FROM
                (
                  SELECT
                    sc.*,
                    DENSE_RANK() OVER (
                      PARTITION BY
                        sc.challenge
                      ORDER BY
                        sc.best_points DESC
                    ) AS position
                  FROM
                    (
                      SELECT
                        sc.event, sc.challenge, sc.user, sc.timestamp,
                        MAX(sc.points) AS best_points
                      FROM
                        scoreboards sc
                      WHERE
                        sc.user IN (
                          SELECT
                            tm.id
                          FROM
                            team_members tm
                        )
                      GROUP BY
                        sc.challenge,
                        sc.user
                      ORDER BY
                        best_points DESC
                    ) sc
                  ORDER BY
                    sc.challenge,
                    sc.best_points DESC
                ) ps
              WHERE
                position <= 3
            ) pd ON tm.id = pd.user
          GROUP BY
            pd.user
          ORDER BY
            user_id ASC
        )
      SELECT
        u.*, tm.role, events, points, awards
      FROM
        user_events ue
        INNER JOIN user_points upt ON ue.user_id = upt.user_id
        INNER JOIN user_podiums up ON upt.user_id = up.user_id
        INNER JOIN user u ON u.id = up.user_id
        INNER JOIN team_members tm ON tm.id = u.id;
    `)

  return response({
    code: 200,
    statusCode: 204,
    data: {
      members: memberResult
    }
  })
}

/**
 * Send a member request from a team
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function postHandler(request, context) {
  // Only authenticated users can kick members
  //if (!request.auth) throw new UnauthorizedException()

  // placeholder!!
  const values = await request.json()

  const userReqId = values.userId

  // team name
  const teamId = context.params.id

  // insert user (catch error if user is already on the team)
  try {
    const row = await db
      .insert(members)
      .values({
        user: userReqId,
        team: teamId,
        role: "pending"
      })
      .returning()

    return response({
      code: 200,
      statusCode: 204,
      data: { userId: row[0].user }
    })
  } catch (e) {
    throw new ConflictException(e.message)
  }
}

/**
 * Kick a member from a team
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function deleteHandler(request, context) {
  // Only authenticated users can kick members
  //if (!request.auth) throw new UnauthorizedException()

  // placeholder!!
  const userId = request.nextUrl.searchParams.get("userId") //request.auth.user.id

  // team name
  const teamId = context.params.id

  // the member to kick from the team
  const memberId = request.nextUrl.searchParams.get("memberId")

  // find if the user is an admin of the team
  const adminResult = db
    .select()
    .from(members)
    .where(
      and(
        eq(members.user, userId),
        eq(members.team, teamId),
        eq(members.role, "admin")
      )
    )

  // find if the member to kick belongs to the team
  const memberResult = await db
    .delete(members)
    .where(and(eq(members.user, memberId), eq(members.team, teamId)))
    .returning({ deletedId: members.user })

  // if the user is not an admin of the team
  if (adminResult.length === 0) throw new ConflictException()

  // if the user to kick is not a member of the team
  if (memberResult.length === 0) throw new NotFoundException()

  return response({
    code: 200,
    statusCode: 204,
    data: { deletedId: memberResult[0].deletedId }
  })
}

export const GET = errorHandler(getHandler)
export const POST = errorHandler(postHandler)
export const DELETE = errorHandler(deleteHandler)
