import { DataTable } from "@/components/app/tables/events/data-table"

export default function Joined({ columns, values }) {
  return <DataTable columns={columns} data={values} />
}
