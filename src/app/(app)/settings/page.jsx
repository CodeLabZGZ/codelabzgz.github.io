import { auth } from "@/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { notFound } from "next/navigation"
import Account from "./account"
import Notifications from "./notifications"

export default async function Page() {
  const session = await auth()
  const data = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user?.id}`)
    .then(({ data }) => data.data)
    .catch(({ response }) => {
      if (response.status === 404) return notFound()
    })

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Ajustes</h2>
      </div>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="account" className="space-y-4">
            <Account data={data} />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Notifications data={data} />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
