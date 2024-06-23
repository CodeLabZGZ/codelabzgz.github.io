import { DataTable } from "@/components/app/tables/team-members/data-table"
import { columns } from "@/components/app/tables/team-members/columns"

export default function Players ({ values }) {
  return <DataTable columns={columns} data={values}/>
}
