import { db } from "@/db"
import { ConflictException, NotFoundException } from "@/lib/api-errors"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { members } from "@/schema"
import { and, eq } from "drizzle-orm"

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

export const DELETE = errorHandler(deleteHandler)
