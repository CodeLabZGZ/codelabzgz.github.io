import { db } from "@/db"
import { events } from "@/schemas"
import { between } from "drizzle-orm"

export async function getEvents({ start, end }) {
  const rows = await db
    .select()
    .from(events)
    .where(between(events.startDate, new Date(start), new Date(end)))
    .orderBy(events.startDate)
  return rows
}
