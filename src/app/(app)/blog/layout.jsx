import { AppLayout } from "@/components/layouts/app"

export const metadata = {
  title: "Blog | codelabzgz",
  description: ""
}

export default function Layout({ children }) {
  return <AppLayout>{children}</AppLayout>
}
