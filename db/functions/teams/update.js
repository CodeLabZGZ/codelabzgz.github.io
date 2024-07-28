import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { teams } from "@/schemas"
import { eq } from "drizzle-orm"

export const update = async ({ slug, values }) => {
  const data = await db
    .update(teams)
    .set(values)
    .where(eq(teams.slug, slug))
    .returning()

  if (!data) throw new NotFoundException()
  return data
}
