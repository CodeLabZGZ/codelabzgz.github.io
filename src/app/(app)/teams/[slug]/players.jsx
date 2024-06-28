import { columns } from "@/components/app/tables/team-members/columns"
import { DataTable } from "@/components/app/tables/team-members/data-table"

export default function Players({ values }) {
  return <DataTable columns={columns} data={values} />
}
