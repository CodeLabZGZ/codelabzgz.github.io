import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { members, teams } from "@/schemas"
import { and, eq } from "drizzle-orm"

export const update = async ({ slug, values }) => {
  const data = await db
    .update(teams)
    .set(values)
    .where(eq(teams.slug, slug))
    .returning()

  if (!data) throw new NotFoundException()
  return data
}

export const updateMembers = async ({ slug, values }) => {
  let data
  if (values.role) {
    data = await db
      .update(members)
      .set(values)
      .where(and(eq(members.team, slug), eq(members.user, values.user)))
      .returning()
  } else {
    data = await db
      .delete(members)
      .where(and(eq(members.team, slug), eq(members.user, values.user)))
      .returning()
  }

  if (!data || data.length === 0) {
    throw new NotFoundException("No records found or modified")
  }
  return data
}

export const insert = async ({ values }) => {
  const [data] = await db.insert(members).values(values).returning()
  return data
}
