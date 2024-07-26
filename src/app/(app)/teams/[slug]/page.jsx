import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Details from "./details"
import JoinRequest from "./join-request"
import Players from "./players"
import Settings from "./settings"

export default async function Page({ params: { slug } }) {
  const teamMembers = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teams/${slug.replaceAll("-", " ")}/members`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store"
    }
  )
    .then(res => res.json())
    .then(res => res.data.members)

  console.log(teamMembers)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
        {/* <div className="flex gap-x-4">
          <Avatar image={user.image} value={user.name} className="h-14 w-14" />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-medium">{user.name}</h1>
            {user.username && (
              <h2 className="text-muted-foreground">@{user.username}</h2>
            )}
          </div>
        </div> */}
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
              teamId={slug.replaceAll("-", " ")}
            />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
