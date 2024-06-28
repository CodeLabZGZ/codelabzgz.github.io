import { and, eq } from "drizzle-orm"

import { auth } from "@/auth"
import { db } from "@/db"
import { UnauthorizedException } from "@/lib/api-errors"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { participations } from "@/schema"

async function deleteHandler(request, context) {
  if (!request.auth) throw new UnauthorizedException()

  const data = await db
    .delete(participations)
    .where(
      and(
        eq(participations.event, Number(context.params.id)),
        eq(participations.user, request.auth.user.id)
      )
    )
    .returning()

  if (data.length === 0) throw new NotFoundException()
  return response({ statusCode: 204 })
}

export const DELETE = errorHandler(auth(deleteHandler))
