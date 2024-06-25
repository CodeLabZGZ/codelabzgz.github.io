import { NotFoundException } from "@/lib/api-errors"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { errorHandler } from "@/middlewares/error-handler"
import { events } from "@/schema"
import { response } from "@/lib/utils"

async function deleteHandler(request, context) {
  const id = context.params.id
  const values = request.json()
  const data = await db.update(events)
    .set(values)
    .where(eq(events.id, id))
    .returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ data })
}

export const DELETE = errorHandler(deleteHandler);