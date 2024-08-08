import { db } from "@/db"
import { users } from "@/schemas"
import { eq } from "drizzle-orm"

export async function getUsers({ limit, offset }) {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email
    })
    .from(users)
    .where(eq(users.marketingEmails, true))
    .limit(limit)
    .offset(offset)
  return rows
}
