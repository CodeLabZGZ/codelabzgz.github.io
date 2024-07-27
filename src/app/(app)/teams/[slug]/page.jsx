import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Avatar } from "@/components/avatar"
import { auth } from "@/middleware"
import Details from "./details"
import JoinRequest from "./join-request"
import Players from "./players"
import Settings from "./settings"

export default async function Page({ params: { slug } }) {
  const spacedSlug = slug.replaceAll("-", " ")
  const session = await auth()
  const teamMembers = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teams/${spacedSlug}/members`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store"
    }
  ).then(async res => {
    const data = await res.json()
    return data.data.members
  })
  console.log(teamMembers)
  const teamInfo = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teams/${spacedSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store"
    }
  ).then(async res => {
    const data = await res.json()
    return data.data
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
      </div>
      <div className="flex gap-x-4">
        <Avatar
          image={""}
          value={slug.replaceAll("-", " ")}
          className="h-14 w-14"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-medium">{slug.replaceAll("-", " ")}</h1>
        </div>
      </div>
      <Tabs defaultValue="team-details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team-details">Detalles</TabsTrigger>
          <TabsTrigger value="team-players">Miembros</TabsTrigger>
          {teamMembers.filter(({ email }) => email === session?.user.email)
            .length > 0 && <TabsTrigger value="settings">Ajustes</TabsTrigger>}
          {teamMembers.filter(({ email }) => email === session?.user.email)
            .length > 0 && (
            <TabsTrigger value="join-request">Solicitudes</TabsTrigger>
          )}
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
          {teamMembers.filter(({ email }) => email === session?.user.email)
            .length > 0 && (
            <div>
              {" "}
              <TabsContent value="settings" className="space-y-4">
                <Settings {...teamInfo} />
              </TabsContent>
              <TabsContent value="join-request" className="space-y-4">
                <JoinRequest
                  values={teamMembers.filter(({ role }) => role === "pending")}
                  teamId={slug.replaceAll("-", " ")}
                />
              </TabsContent>{" "}
            </div>
          )}
        </main>
      </Tabs>
    </div>
  )
}
