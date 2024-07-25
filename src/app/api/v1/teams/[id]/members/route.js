import { db } from "@/db"
import { ConflictException, NotFoundException } from "@/lib/api-errors"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { members, users } from "@/schema"
import { and, eq, ne } from "drizzle-orm"

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
  const memberResult = await db
    .select()
    .from(members)
    .innerJoin(users, eq(users.id, members.user))
    .where(and(eq(members.team, teamId), ne(members.role, "pending")))
    .all()

  return response({
    code: 200,
    statusCode: 204,
    data: {
      members: memberResult.map(d => {
        // aggregate all fields without naming
        return { ...d.members, ...d.user }
      })
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
  console.log(values)

  const userReqId = values.userId

  // team name
  const teamId = context.params.id

  // insert user (catch error if user is already on the team)
  try {
    console.log(userReqId)
    console.log(teamId)
    const row = await db.insert(members)
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
  }
  catch (e) {
    console.log(e)
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

  console.log(memberResult)

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
