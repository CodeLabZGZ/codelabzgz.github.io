export const sites = [
  {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1
  }
]

export default function sitemap () {
  return sites.sort((a, b) => Number(b.priority) - Number(a.priority))
}
