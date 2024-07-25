import { getContent } from "@/lib/fetchers"
import Link from "next/link"

export default async function Page() {
  const { error, data } = await getContent(`posts`)

  const opciones = { day: "numeric", month: "short", year: "numeric" }
  const formatter = new Intl.DateTimeFormat("es-ES", opciones)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
      </div>
      <main>
        <section className="flex flex-col divide-y-2">
          {data.map(
            ({ slug, frontmatter: { title, description, author, date } }) => (
              <Link
                href={`/blog/${slug}`}
                key={slug}
                className="space-y-2 py-4"
              >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="line-clamp-2 text-muted-foreground">
                  {description}
                </p>
                <div className="flex items-center gap-x-2 text-sm text-muted">
                  <p>{author}</p>|
                  <time dateTime={date} className="capitalize">
                    {formatter.format(new Date(date))}
                  </time>
                </div>
              </Link>
            )
          )}
        </section>
      </main>
    </>
  )
}
