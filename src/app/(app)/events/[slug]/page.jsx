import PageComponent from "./page-component"
import { getContent } from "./fetchers"
import { notFound } from "next/navigation"

export default async  function Page ({params: { slug }}) {
  const  { error, data: values} = await getContent(slug)
  if (error) notFound()

  return (
    <div className="text-white">
      <PageComponent values={values.filter(v => v?.frontmatter?.title && v?.frontmatter?.title !== "overview")} event={slug}/>
    </div>
  )
}
