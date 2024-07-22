"use client"

import { Skeleton } from "@/components/ui/skeleton"
import useSWR, { useSWRConfig } from "swr"

import TeamBanner from "@/components/app/team-banner"

export default function Details({ values }) {
  const { fetcher } = useSWRConfig()
  const { data, isLoading, error } = useSWR(
    `/api/v1/teams/${values.teamId}`,
    fetcher
  )

  if (isLoading) {
    return (
      <>
        <div className="flex h-full flex-col items-start justify-between gap-2 space-y-2">
          <div className="flex h-14 w-full items-center gap-4 py-8">
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex h-full flex-col items-start justify-between gap-2 space-y-2">
        <TeamBanner data={data.data} />
        <div className="flex items-center gap-x-2">
          past events or whatever 🙂
        </div>
      </div>
    </>
  )
}
