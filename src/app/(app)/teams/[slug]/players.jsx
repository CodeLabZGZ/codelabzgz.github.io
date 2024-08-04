import { columns } from "@/components/app/teams/team-members/columns"
import { DataTable } from "@/components/app/teams/team-members/data-table"

export default function Players({ values }) {
  return <DataTable columns={columns} data={values} />
}
