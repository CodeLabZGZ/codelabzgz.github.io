import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

import Joined from "./joined"
import OnGoing from "./ongoing"
import Past from "./past"
import UpGoing from "./upgoing"
import { columns } from "@/components/app/tables/events/columns"

export default function Page () {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
      </div>
      <Tabs defaultValue="ongoing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ongoing">En curso</TabsTrigger>
          <TabsTrigger value="upgoing">Programados</TabsTrigger>
          <TabsTrigger value="joined">Participando</TabsTrigger>
          <TabsTrigger value="past">Pasados</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="ongoing" className="space-y-4">
            <OnGoing columns={columns} />
          </TabsContent>
          <TabsContent value="upgoing" className="space-y-4">
            <UpGoing columns={columns} />
          </TabsContent>
          <TabsContent value="joined" className="space-y-4">
            <Joined columns={columns} />
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <Past columns={columns} />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
