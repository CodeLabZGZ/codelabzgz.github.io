import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

import All from "./all"
import { CreateTeam } from "@/components/app/forms/create-team"
import MyTeams from "./my-teams"
import { columns } from "@/components/app/tables/teams/columns"

export default function Page ({ children }) {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
        <CreateTeam />
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="my-teams">Mis equipos</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="all" className="space-y-4">
            <All columns={columns} />
          </TabsContent>
          <TabsContent value="my-teams" className="space-y-4">
            <MyTeams columns={columns} />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
