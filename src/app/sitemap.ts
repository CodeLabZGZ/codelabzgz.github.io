import { sites } from "@/config/sitemap"

export default function sitemap () {
	return sites.sort((a, b) => Number(b.priority) - Number(a.priority))
}