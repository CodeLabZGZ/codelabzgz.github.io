"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Details from "./details"
import JoinRequest from "./join-request"
import Players from "./players"
import Settings from "./settings"

import { Skeleton } from "@/components/ui/skeleton"
import useSWR, { useSWRConfig } from "swr"

function MembersTab({ teamId, members, loading, error }) {
  if (loading || !members) {
    return (
      <TabsContent value="team-players" className="space-y-4">
        <Skeleton>
          <Skeleton />
          <Skeleton />
        </Skeleton>
      </TabsContent>
    )
  }

  if (error) {
    return (
      <TabsContent value="team-players" className="space-y-4">
        <div>
          <h2>Error cargando los miembros del equipo</h2>
        </div>
      </TabsContent>
    )
  }

  console.log(members)

  return (
    <TabsContent value="team-players" className="space-y-4">
      <Players values={members.data.members} />
    </TabsContent>
  )
}

function RequestsTab({ teamId, requests, loading, error }) {
  if (loading || !requests) {
    return (
      <TabsContent value="join-request" className="space-y-4">
        <Skeleton>
          <Skeleton />
          <Skeleton />
        </Skeleton>
      </TabsContent>
    )
  }

  if (error) {
    return (
      <TabsContent value="join-request" className="space-y-4">
        <div>
          <h2>Error cargando las peticiones de entrada al equipo</h2>
        </div>
      </TabsContent>
    )
  }

  return (
    <TabsContent value="join-request" className="space-y-4">
      <JoinRequest
        values={requests.data.requests}
        teamId={teamId.replaceAll("-", " ")}
      />
    </TabsContent>
  )
}

export default function Page({ params: { slug } }) {
  const { fetcher } = useSWRConfig()

  // load members of the team
  const {
    data: membersData,
    isLoading: membersLoading,
    error: membersError
  } = useSWR(`/api/v1/teams/${slug.replaceAll("-", " ")}/members`, fetcher)

  // load pending requests
  const {
    data: requestsData,
    isLoading: requestsLoading,
    error: requestsError
  } = useSWR(`/api/v1/teams/${slug.replaceAll("-", " ")}/request`, fetcher)

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
          <MembersTab
            teamId={slug}
            members={membersData}
            loading={membersLoading}
            error={membersError}
          />
          <TabsContent value="settings" className="space-y-4">
            <Settings />
          </TabsContent>
          <RequestsTab
            teamId={slug}
            requests={requestsData}
            loading={requestsLoading}
            error={requestsError}
          />
        </main>
      </Tabs>
    </>
  )
}
