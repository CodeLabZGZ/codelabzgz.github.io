import { DataTable } from "@/components/app/teams/data-table"

export default function All({ columns, values }) {
  return <DataTable columns={columns} data={values} />
}
