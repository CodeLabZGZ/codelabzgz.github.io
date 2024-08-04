import { buttonVariants } from "@/components/ui/button"
import { getContent } from "@/lib/fetchers"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

const options = { day: "numeric", month: "short", year: "numeric" }

export default async function Page() {
  const { data } = await getContent(`posts`)

  return (
    <div className="mx-auto max-w-prose">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
        <div className="flex items-center gap-x-2">
          <a
            href="https://github.com/CodeLabZGZ/codelabzgz.github.io/issues/new/choose"
            className={buttonVariants({ variant: "outline" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Publicar post
          </a>
        </div>
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
                <div className="flex items-center gap-x-2 text-sm">
                  <p>{author}</p>|
                  <time dateTime={date} className="capitalize">
                    {formatDate({ date: new Date(date), options })}
                  </time>
                </div>
              </Link>
            )
          )}
        </section>
      </main>
    </div>
  )
}
