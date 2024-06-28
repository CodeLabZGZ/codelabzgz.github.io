import { toString } from "mdast-util-to-string"
import { mdxAnnotations } from "mdx-annotations"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { rehypeGithubAlerts } from "rehype-github-alerts"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import rehypeMdxCodeProps from "rehype-mdx-code-props"
import rehypeSlug from "rehype-slug"
import { remarkRehypeWrap } from "remark-rehype-wrap"

export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeSlug,
  rehypeKatex,
  [rehypeAutolinkHeadings, { behavior: "wrap", test: ["h2"] }],
  rehypeGithubAlerts,
  rehypeHighlight,
  [
    remarkRehypeWrap,
    {
      node: { type: "element", tagName: "article" },
      start: "element[tagName=hr]",
      transform: article => {
        article.children.splice(0, 1)
        let heading = article.children.find(n => n.tagName === "h2")
        article.properties = { ...heading.properties, title: toString(heading) }
        heading.properties = {}
        return article
      }
    }
  ],
  rehypeMdxCodeProps
]
