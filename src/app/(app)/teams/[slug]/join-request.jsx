"use client"
import { useJoinRequestColumns } from "@/components/app/teams/team-join-requests/columns"
import { DataTable } from "@/components/app/teams/team-join-requests/data-table"

export default function JoinRequest({ values, teamId }) {
  // This hook loads the columns parameterized by the team id
  const cols = useJoinRequestColumns(teamId)

  return <DataTable columns={cols} data={values} />
}
