import { auth } from "@/auth"
import { db } from "@/db"
import { events } from "@/schemas"
import { eq } from "drizzle-orm"

export default async function Page({ params: { slug } }) {
  const session = await auth()

  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.title, slug.replaceAll("-", " ")))

  console.log(slug.replace("-", " "), event)

  // const { data } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)

  // const { error, data: values } = await getContent(`events/${slug}`)
  // if (error) return notFound()

  return (
    <div className="text-white">
      {/* <PageComponent
        slug={slug}
        data={{}}
        values={values.filter(
          v => v?.frontmatter?.title && v?.frontmatter?.title !== "overview"
        )}
      /> */}
    </div>
  )
}
