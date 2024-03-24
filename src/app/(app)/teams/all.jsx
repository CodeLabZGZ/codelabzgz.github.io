import { DataTable } from "@/components/app/tables/teams/data-table"
import data from "@/components/app/tables/teams/data.json"

export default function All ({ columns }) {
  return <DataTable columns={columns} data={data} />
}
