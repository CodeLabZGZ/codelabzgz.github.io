import { db } from "@/db"
import { eq } from "drizzle-orm"
import { events } from "@/schema"
import { notFound } from "next/navigation"

export default async function Page({ params: {slug} }) {
  const [ event ] = await db.select().from(events).where(eq(events.title, slug.replaceAll("-", " ")))
  if (!event || event.length === 0) return notFound()
    
  return (
    <div>page</div>
  )
}
