import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { users } from "@/schema"
import { eq } from "drizzle-orm"

async function putHandler(request, context) {
  const id = context.params.id
  const values = request.json()
  const data = await db
    .update(users)
    .set(values)
    .where(eq(users.id, id))
    .returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ data })
}

async function patchHandler(request, context) {
  const id = context.params.id
  const { title, description } = request.json()

  const values = {
    ...(title && { title }),
    ...(description && { description })
  }

  const data = await db
    .update(users)
    .set(values)
    .where(eq(users.id, id))
    .returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ data })
}

async function getHandler(request, context) {
  const id = context.params.id
  const data = await db.query.users.findFirst({
    where: eq(users.id, id)
  })

  if (!data) throw new NotFoundException()
  return response({ data })
}

async function deleteHandler(request, context) {
  const id = context.params.id
  const rows = await db.delete(users).where(eq(users.id, id)).returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ code: 200, statusCode: 204 })
}

export const PUT = errorHandler(putHandler)
export const PATCH = errorHandler(patchHandler)
export const GET = errorHandler(getHandler)
export const DELETE = errorHandler(deleteHandler)
