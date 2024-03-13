import AppLayout from "@/components/app/app-layout"

export default function PageLayout(
  { children }: { children: React.ReactNode}
) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}
