import { db } from "@/db"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { events } from "@/schema"

async function postHandler(request) {
  const values = request.json()

  const data = await db.insert(events).values(values).returning()

  return response({ data, statusCode: 201 })
}

async function getHandler() {
  const data = await db.query.events.findMany()
  return response({ data })
}

export const POST = errorHandler(postHandler)
export const GET = errorHandler(getHandler)
