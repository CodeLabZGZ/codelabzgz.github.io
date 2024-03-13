import { compileMDX } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'

const rootDirectory = path.join(process.cwd(), 'src', 'content','events')

export const getFileBySlug = async slug => {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true }
  })

  return { meta: { ...frontmatter, slug: realSlug }, content }
}

export const getAllFilesMeta = async () => {
  const files = fs.readdirSync(rootDirectory)

  const promises =  await Promise.all(files.map((file) => getFileBySlug(file)));

  return promises.map(({meta}) => meta)
}