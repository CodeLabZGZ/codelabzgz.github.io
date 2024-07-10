import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { members, users } from "@/schema"

import { db } from "@/db"
import { sql } from "drizzle-orm"
import Details from "./details"
import JoinRequest from "./join-request"
import Players from "./players"
import Settings from "./settings"

export default async function Page({ params: { slug } }) {
  const teamMembers = db.all(sql`
    SELECT u.id, u.image, u.name, u.status, u.username, m.createdAt, m.updatedAt, m.role
    FROM ${users} u
    JOIN ${members} m ON u.id = m.user
    WHERE m.team = ${slug.replaceAll("-", " ")} 
    ORDER BY m.role;
  `)

  console.log(slug)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
      </div>
      <Tabs defaultValue="team-players" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team-details">Detalles</TabsTrigger>
          <TabsTrigger value="team-players">Miembros</TabsTrigger>
          <TabsTrigger value="settings">Ajustes</TabsTrigger>
          <TabsTrigger value="join-request">Solicitudes</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="team-details" className="space-y-4">
            <Details values={{ teamId: slug }} />
          </TabsContent>
          <TabsContent value="team-players" className="space-y-4">
            <Players
              values={teamMembers.filter(({ role }) => role !== "pending")}
            />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Settings />
          </TabsContent>
          <TabsContent value="join-request" className="space-y-4">
            <JoinRequest
              values={teamMembers.filter(({ role }) => role === "pending")}
            />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
