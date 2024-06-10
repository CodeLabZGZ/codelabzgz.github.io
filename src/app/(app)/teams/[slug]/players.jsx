import { DataTable } from "@/components/app/tables/team-members/data-table"

export default function Players ({ columns, values }) {
  return <DataTable columns={columns} data={values}/>
}
