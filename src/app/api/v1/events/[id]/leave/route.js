import { and, eq } from "drizzle-orm"

import { UnauthorizedException } from "@/lib/api-errors"
import { auth } from "@/auth"
import { db } from "@/db"
import { errorHandler } from "@/middlewares/error-handler"
import { participations } from "@/schema"
import { response } from "@/lib/utils"

async function deleteHandler(request, context) {
  if (!request.auth) throw new UnauthorizedException()
    
  const data = await db.delete(participations)
    .where(and(
      eq(participations.event, Number(context.params.id)),
      eq(participations.user, request.auth.user.id)
    ))
    .returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ data })
}

export const DELETE = errorHandler(auth(deleteHandler));