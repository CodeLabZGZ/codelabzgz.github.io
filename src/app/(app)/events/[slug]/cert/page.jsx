import { auth } from "@/auth"
import { db } from "@/db"
import { events, participations, users } from "@/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Certificate from "./Certificate"
const { createHash } = await import("node:crypto")

export default async function Page({ params: { slug } }) {
  const session = await auth()
  const [data] = await db
    .select({
      event: events.title,
      name: users.name,
      date: events.endDate
    })
    .from(events)
    .innerJoin(participations, eq(participations.user, session?.user?.id))
    .innerJoin(users, eq(users.id, session?.user?.id))
    .where(eq(events.title, slug.replaceAll("-", " ")))

  if (!data) return notFound()

  return (
    <div>
      <Certificate
        event={data.event}
        name={data.name}
        date={data.date}
        cert={createHash("sha256")
          .update(JSON.stringify(data))
          .digest("hex")
          .slice(0, 12)}
      />
    </div>
  )
}
