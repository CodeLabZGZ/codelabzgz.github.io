import { members, teams } from "@/schema"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { errorHandler } from "@/middlewares/error-handler"
import { response } from "@/lib/utils"

async function postHandler(request) {
  const values = request.json()

  const data = await db.insert(teams).values(values).returning()

  return response({ data, statusCode: 201 })
}

async function getHandler(request) {
  const userId = request.nextUrl.searchParams.get("userId")

  if (userId) {
    const data = await db.query.members.findMany({
      where: eq(members.user, userId),
      with: {
        team: true
      }
    })
    return response({ data })
  }

  // no user id: get all teams
  const data = await db.query.teams.findMany()
  return response({ data })
}

export const POST = errorHandler(postHandler)
export const GET = errorHandler(getHandler)
