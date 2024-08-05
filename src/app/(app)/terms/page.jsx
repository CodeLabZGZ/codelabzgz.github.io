import { getContentBySlug } from "@/lib/fetchers"
import { formatDate } from "@/lib/utils"
import "@/styles/github-dark.css"
import "@/styles/github-markdown.css"
import "@/styles/katex.css"
import { notFound } from "next/navigation"

const options = { day: "numeric", month: "long", year: "numeric" }

export default async function Page() {
  const template = await getContentBySlug("templates", "terms", ".md")
  if (!template) return notFound()

  return (
    <div className="mx-auto max-w-prose space-y-6">
      <header className="space-y-4">
        <span className="text-xs text-muted-foreground">
          Última actualización el{" "}
          <time dateTime={template.frontmatter.date}>
            {formatDate({
              date: new Date(template.frontmatter.date),
              options
            })}
          </time>
        </span>
        <h1 className="text-4xl">{template.frontmatter.title}</h1>
      </header>
      <main className="markdown-body">{template.content}</main>
    </div>
  )
}
