import { db } from "@/db"
import { errorHandler } from "@/middlewares/error-handler"
import { response } from "@/lib/utils"
import { users } from "@/schema"

async function postHandler(request) {
  const values = request.json()

  const data = await db.insert(users)
    .values(values)
    .returning()

  return response({ data, statusCode: 201 })
}
 
async function getHandler(request) {
  const data = await db.query.users.findMany()
  return response({ data })
}

export const POST = errorHandler(postHandler);
export const GET = errorHandler(getHandler);