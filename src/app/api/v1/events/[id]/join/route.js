import { ConflictException, NotFoundException } from "@/lib/api-errors"

import { auth } from "@/auth"
import { db } from "@/db"
import { errorHandler } from "@/middlewares/error-handler"
import { participations } from "@/schema"
import { response } from "@/lib/utils"

async function postHandler(request, context) {
  if (!request.auth) throw new UnauthorizedException()

  const team = await request.json()
  const data = await db
    .insert(participations)
    .values({
      event: Number(context.params.id),
      user: request.auth.user.id,
      ...team
    })
    .returning()
    .catch(error => {
      if (error.message.includes("UNIQUE")) throw new ConflictException()
    })

  if (data.length === 0) throw new NotFoundException()
  return response({ data })
}

export const POST = errorHandler(auth(postHandler))
