import { Avatar } from "@/components/avatar"
import { getContentBySlug } from "@/lib/fetchers"
import { notFound } from "next/navigation"

export default async function Page({ params: { slug } }) {
  const post = await getContentBySlug("posts", slug, ".md")
  if (!post) return notFound()

  const opciones = { day: "numeric", month: "short", year: "numeric" }
  const formatter = new Intl.DateTimeFormat("es-ES", opciones)

  return (
    <div className="mx-auto max-w-prose space-y-6">
      <header className="space-y-2">
        <div className="flex gap-x-2">
          <Avatar image="" value={post.frontmatter.author} />
          <div className="flex flex-col">
            <span>{post.frontmatter.author}</span>
            <span className="text-xs text-muted-foreground">
              Publicado el{" "}
              <time dateTime={post.frontmatter.date} className="capitalize">
                {formatter.format(new Date(post.frontmatter.date))}
              </time>
            </span>
          </div>
        </div>
        <h1 className="text-4xl">{post.frontmatter.title}</h1>
      </header>
      <main className="markdown-body">{post.content}</main>
    </div>
  )
}
