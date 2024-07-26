import { DataTable } from "@/components/app/events/data-table"

export default function Past({ columns, values }) {
  return <DataTable columns={columns} data={values} />
}
