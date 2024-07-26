import { Avatar } from "@/components/avatar"
import { buttonVariants } from "@/components/ui/button"
import { getContentBySlug } from "@/lib/fetchers"
import "@/styles/github-dark.css"
import "@/styles/github-markdown.css"
import "@/styles/katex.css"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TbChevronLeft as ChevronLeft } from "react-icons/tb"

export default async function Page({ params: { slug } }) {
  const post = await getContentBySlug("posts", slug, ".md")
  if (!post) return notFound()

  const opciones = { day: "numeric", month: "short", year: "numeric" }
  const formatter = new Intl.DateTimeFormat("es-ES", opciones)

  return (
    <div className="mx-auto max-w-prose space-y-6">
      <header className="space-y-4">
        <div className="relative flex items-center gap-x-2">
          <Link
            href="/blog"
            className={buttonVariants({
              variant: "outline",
              size: "icon",
              className: "absolute -ml-8 h-7 w-7 -translate-x-full"
            })}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
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
