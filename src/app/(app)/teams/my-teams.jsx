import { DataTable } from "@/components/app/tables/teams/data-table"

export default function MyTeams ({ columns, values }) {
  return <DataTable columns={columns} data={values} />
}
