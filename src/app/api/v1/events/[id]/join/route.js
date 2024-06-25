import { ConflictException, NotFoundException } from "@/lib/api-errors"

import { db } from "@/db"
import { errorHandler } from "@/middlewares/error-handler"
import { participations } from "@/schema"
import { response } from "@/lib/utils"

async function postHandler(request, context) {
  const event = Number(context.params.id)
  const values = await request.json()

  const data = await db.insert(participations)
    .values({
      event,
      ...values
    })
    .returning()
    .catch(error => {
      console.log(error)
      if (error.message.includes("UNIQUE")) throw new ConflictException()
    })
      
  if (data.length === 0) throw new NotFoundException()
  return response({ data })
}

export const POST = errorHandler(postHandler);