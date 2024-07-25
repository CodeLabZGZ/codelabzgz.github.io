import { Avatar } from "@/components/avatar"
import { db } from "@/db"
import { users } from "@/schema"
import { eq } from "drizzle-orm"

export default async function Page({ params: { userId } }) {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      image: true,
      name: true,
      username: true
    },
    where: eq(users.id, userId)
  })

  return (
    <>
      <div className="flex gap-x-4">
        <Avatar image={user.image} value={user.name} className="h-14 w-14" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">{user.name}</h1>
          <h2 className="text-muted-foreground">@{user.username}</h2>
        </div>
      </div>
      <p>{user.description}</p>
    </>
  )
}
