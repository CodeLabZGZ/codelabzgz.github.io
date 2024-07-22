import { db } from "@/db"
import { ConflictException, NotFoundException } from "@/lib/api-errors"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { members } from "@/schema"
import { and, eq } from "drizzle-orm"

/**
 * Get all join requests of the team.
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function getHandler(request, context) {
  // Only authenticated users can see team requests
  //if (!request.auth) throw new UnauthorizedException()

  // placeholder!!
  const userId = request.nextUrl.searchParams.get("userId") //request.auth.user.id

  // team name
  const teamId = context.params.id

  // query all requests
  const requestResult = db
    .select()
    .from(members)
    .where(
      and(
        eq(members.user, userId),
        eq(members.team, teamId),
        eq(members.role, "pending")
      )
    )

  return response({
    code: 200,
    statusCode: 204,
    data: { requests: requestResult }
  })
}

/**
 * Accept a join request to the team.
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function patchHandler(request, context) {
  // Only authenticated users can accept members into the team
  //if (!request.auth) throw new UnauthorizedException()
  const values = await request.json()

  // placeholder!!
  const userId = values.userId //request.auth.user.id

  // team name
  const teamId = context.params.id

  // the member to kick from the team
  const reqId = values.reqId

  // find if the user is an admin of the team
  const adminResult = await db
    .select()
    .from(members)
    .where(
      and(
        eq(members.user, userId),
        eq(members.team, teamId),
        eq(members.role, "admin")
      )
    )

  // find if the member sent a request
  const memberResult = await db
    .update(members)
    .set({ role: "member" })
    .where(and(eq(members.user, reqId), eq(members.team, teamId), eq(members.role, "pending")))
    .returning({ updatedId: members.user })

  console.log(userId, memberResult, reqId, adminResult, teamId)

  // if the user is not an admin of the team
  if (adminResult.length === 0) throw new ConflictException()

  // if the user to kick didn't send a request
  if (memberResult.length === 0) throw new NotFoundException()

  return response({
    code: 200,
    statusCode: 204,
    data: { updatedId: memberResult[0].updatedId }
  })
}

/**
 * Accept a join request to the team.
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function deleteHandler(request, context) {
  // Only authenticated users can accept members into the team
  //if (!request.auth) throw new UnauthorizedException()

  // placeholder!!
  const userId = request.nextUrl.searchParams.get("userId") //request.auth.user.id

  // team name
  const teamId = context.params.id

  // the member to kick from the team
  const reqId = request.nextUrl.searchParams.get("reqId")

  // find if the user is an admin of the team
  const adminResult = await db
    .select()
    .from(members)
    .where(
      and(
        eq(members.user, userId),
        eq(members.team, teamId),
        eq(members.role, "admin")
      )
    )

  // remove the user who sent a request
  const memberResult = await db
    .delete(members)
    .where(and(eq(members.user, reqId), eq(members.team, teamId), eq(members.role, "pending")))
    .returning({ deletedId: members.user })

  // if the user is not an admin of the team
  if (adminResult.length === 0) throw new ConflictException()

  // if the user to kick didn't send a request
  if (memberResult.length === 0) throw new NotFoundException()

  return response({
    code: 200,
    statusCode: 204,
    data: { deletedId: memberResult[0].deletedId }
  })
}

export const GET = errorHandler(getHandler)
export const PATCH = errorHandler(patchHandler)
export const DELETE = errorHandler(deleteHandler)
