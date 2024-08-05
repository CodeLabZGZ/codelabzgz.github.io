import { columns } from "@/components/app/events/columns"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "auth"
import axios from "axios"
import Joined from "./joined"
import OnGoing from "./ongoing"
import Past from "./past"
import UpGoing from "./upgoing"

const currentDate = new Date()

export default async function Page() {
  const { user } = await auth()
  const records = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/events?participations=true`)
    .then(({ data }) => {
      return data.data.map(({ participations, ...r }) => ({
        ...r,
        participating: participations.findIndex(p => p.user === user.id) !== -1,
        people: participations.length
      }))
    })
    .catch(err => console.error(err.message))

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
        <div className="flex items-center gap-x-2">
          <a
            href="https://github.com/CodeLabZGZ/codelabzgz.github.io/issues/new/choose"
            className={buttonVariants({ variant: "outline" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Crear evento
          </a>
        </div>
      </div>
      <Tabs defaultValue="ongoing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ongoing">En curso</TabsTrigger>
          <TabsTrigger value="upgoing">Programados</TabsTrigger>
          <TabsTrigger value="joined">Participando</TabsTrigger>
          <TabsTrigger value="past">Pasados</TabsTrigger>
        </TabsList>
        <main>
          <TabsContent value="ongoing" className="space-y-4">
            <OnGoing
              columns={columns}
              values={records.filter(
                e =>
                  new Date(e.startDate) <= currentDate &&
                  currentDate <= new Date(e.endDate)
              )}
            />
          </TabsContent>
          <TabsContent value="upgoing" className="space-y-4">
            <UpGoing
              columns={columns}
              values={records.filter(e => new Date(e.startDate) > currentDate)}
            />
          </TabsContent>
          <TabsContent value="joined" className="space-y-4">
            <Joined
              columns={columns}
              values={records.filter(
                e =>
                  e.participating &&
                  new Date(e.startDate) <= currentDate &&
                  currentDate <= new Date(e.endDate)
              )}
            />
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <Past
              columns={columns}
              values={records.filter(e => new Date(e.endDate) < currentDate)}
            />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
