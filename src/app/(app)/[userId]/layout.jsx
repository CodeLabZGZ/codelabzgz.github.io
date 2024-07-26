import { AppLayout } from "@/components/layouts/app"

export const metadata = {
  title: "Perfil | codelab",
  description: ""
}

export default function Layout({ children }) {
  return <AppLayout>{children}</AppLayout>
}
