import { NotFoundException } from "@/lib/api-errors"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { errorHandler } from "@/middlewares/error-handler"
import { response } from "@/lib/utils"
import { teams } from "@/schema"

async function putHandler(request, context) {
  const id = context.params.id
  const values = request.json()
  const data = await db.update(teams)
    .set(values)
    .where(eq(teams.id, id))
    .returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ data })
}
 
async function patchHandler(request, context) {
  const id = context.params.id
  const {title, description} = request.json()

  const values = {
    ...(title && { title }),
    ...(description && { description }),
  }

  const data = await db.update(teams)
    .set(values)
    .where(eq(teams.id, id))
    .returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ data })
}

async function getHandler(request, context) {
  const id = context.params.id
  const data = await db.query.teams.findFirst({ 
    where: eq(teams.name, id)
  })

  if (!data) throw new NotFoundException()
  return response({ data })
}
 
async function deleteHandler(request, context) {
  const id = context.params.id
  const rows = await db.delete(teams)
    .where(eq(teams.name, id))
    .returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ code: 200, statusCode: 204 })
}

export const PUT = errorHandler(putHandler);
export const PATCH = errorHandler(patchHandler);
export const GET = errorHandler(getHandler);
export const DELETE = errorHandler(deleteHandler);