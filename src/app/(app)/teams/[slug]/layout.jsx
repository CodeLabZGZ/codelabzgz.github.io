import { AppLayout } from "@/components/layouts/app"

export const metadata = {
  title: "",
  description: ""
}

export default function Layout ({ children }) {
  return (
    <AppLayout>
      <main>
        {children}
      </main>
    </AppLayout>
  )
}
