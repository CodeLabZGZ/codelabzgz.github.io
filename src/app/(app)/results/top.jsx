import { DataTable } from "@/components/app/tables/teams/data-table"

export default function Top ({ columns, values }) {
  return <DataTable columns={columns} data={values} />
}
