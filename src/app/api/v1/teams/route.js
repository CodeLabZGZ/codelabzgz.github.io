import { db } from "@/db"
import { errorHandler } from "@/middlewares/error-handler"
import { response } from "@/lib/utils"
import { teams } from "@/schema"

async function postHandler(request) {
  const values = request.json()

  const data = await db.insert(teams)
    .values(values)
    .returning()

  return response({ data, statusCode: 201 })
}
 
async function getHandler(request) {
  const data = await db.query.teams.findMany()
  return response({ data })
}

export const POST = errorHandler(postHandler);
export const GET = errorHandler(getHandler);