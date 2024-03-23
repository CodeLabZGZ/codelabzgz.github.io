import { DataTable } from "@/components/app/tables/events/data-table"
import data from "@/components/app/tables/events/data.json"

export default function OnGoing ({ columns }) {
  return <DataTable columns={columns} data={data} />
}
