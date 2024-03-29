import { AppLayout } from "@/components/layouts/app"

export const metadata = {
  title: "",
  description: ""
}

export default function Layout ({ children }) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}
