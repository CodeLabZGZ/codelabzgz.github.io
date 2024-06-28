import { columns } from "@/components/app/tables/team-join-requests/columns"
import { DataTable } from "@/components/app/tables/team-join-requests/data-table"

export default function JoinRequest({ values }) {
  return <DataTable columns={columns} data={values} />
}
