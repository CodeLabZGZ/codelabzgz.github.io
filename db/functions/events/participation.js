import { and, eq } from "drizzle-orm"

import { db } from "@/db"
import { ConflictException, NotFoundException } from "@/lib/api-errors"
import { participations } from "@/schema"

export const join = async ({ values }) => {
  const data = await db
    .insert(participations)
    .values(values)
    .returning()
    .catch(error => {
      if (error.message.includes("UNIQUE")) throw new ConflictException()
    })

  if (data.length === 0) throw new NotFoundException()
  return data[0]
}

export const leave = async ({ event, user }) => {
  const data = await db
    .delete(participations)
    .where(and(eq(participations.event, event), eq(participations.user, user)))
    .returning()

  if (data.length === 0) throw new NotFoundException()
  return data[0]
}
