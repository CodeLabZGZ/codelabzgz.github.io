import{ compileMDX } from "next-mdx-remote/rsc"
import { error } from "console"
import fs from "fs"
import path from "path"

const contentDir = path.join(process.cwd(), "src/content")

export async function getContentBySlug(eventFolder, slug) {
  const fileName = slug + ".md"
  const filePath = path.join(contentDir, eventFolder, fileName)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: {parseFrontmatter: true}
  })

  return {
    frontmatter,
    content,
    slug: path.parse(fileName).name
  }
}

export async function getContent(eventFolder) {
  try {
    const filePath = path.join(contentDir, eventFolder)
    const files = fs.readdirSync(filePath)
    const values = await Promise.all(
      files.map(async (file) => await getContentBySlug(eventFolder, path.parse(file).name))
    )
    return {error: null, data: values}
  } catch (error) {
    return {error, data: null}
  }
}

export function getAllContentSlug(eventFolder) {
  const filePath = path.join(contentDir, eventFolder)
  const files = fs.readdirSync(filePath)
  const slugs = files.map((file) => ({ slug: path.parse(file).name }))
  return slugs
}