import pb from "@/lib/pocketbase"

export default async function All () {
  await pb.collection("teams").getFullList()
    .then(records => console.log(records))
    .catch(err => console.error(err))

  return (
    <div>Todos</div>
  )
}
