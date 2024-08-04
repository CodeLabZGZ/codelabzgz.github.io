import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { users } from "@/schemas"
import { eq } from "drizzle-orm"

export const update = async ({ id, values }) => {
  const data = await db
    .update(users)
    .set(values)
    .where(eq(users.id, id))
    .returning()

  if (data && data?.length === 0) throw new NotFoundException()
  return data[0]
}
