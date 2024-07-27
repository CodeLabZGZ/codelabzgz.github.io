import { columns } from "@/components/app/teams/team-join-requests/columns"
import { DataTable } from "@/components/app/teams/team-join-requests/data-table"

export default function JoinRequest({ values }) {
  return <DataTable columns={columns} data={values} />
}
