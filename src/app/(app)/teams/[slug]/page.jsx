import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

import Details from "./details"
import JoinRequest from "./join-request"
import Players from "./players"
import Settings from "./settings"
import { columns } from "@/components/app/tables/team-members/columns"

export default function Page () {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
      </div>
      <Tabs defaultValue="team-details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team-details">Detalles</TabsTrigger>
          <TabsTrigger value="team-players">Miembros</TabsTrigger>
          <TabsTrigger value="settings">Ajustes</TabsTrigger>
          <TabsTrigger value="join-request">Solicitudes</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="team-details" className="space-y-4">
            <Details/>
          </TabsContent>
          <TabsContent value="team-players" className="space-y-4">
            <Players columns={columns} values={[]} />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Settings/>
          </TabsContent>
          <TabsContent value="join-request" className="space-y-4">
            <JoinRequest/>
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
