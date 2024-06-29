import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Account from "./account"
import Notifications from "./notifications"

export default async function Page() {
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
            <Account />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Notifications />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
