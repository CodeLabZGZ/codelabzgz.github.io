export async function generateMetadata({ params: { slug } }) {
  return {
    title: `${slug.replaceAll("-", " ")} | codelabzgz`
  }
}

export default function Layout({ children }) {
  return <>{children}</>
}
