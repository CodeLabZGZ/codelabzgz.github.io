import Top from "./top"
import { columns } from "@/components/app/tables/teams/columns"
import { auth } from "auth"
import { members, scoreboards } from "db/schema"
import { db } from "db"
import { sql } from "drizzle-orm"

export default async function Page () {
  const { user } = await auth()

  const rankings = await db.all(sql`
  SELECT team, event, SUM(points) AS total_points
  FROM (
      SELECT team, event, challenge, points, ROW_NUMBER() OVER (PARTITION BY event ORDER BY points DESC) AS row_num
      FROM ${scoreboards}
  )
  WHERE row_num <= 5
  GROUP BY team, event
  ORDER BY event, total_points DESC
`)

  let records = await db.query.teams.findMany({ with: { members, scoreboards } })
  records = records.map(record => {
    const ownership = record.members.find(m => m.user === user.id)

    const awards = rankings.reduce((prev, next) => {
      if (next.team === record.name) return prev + 1
      return prev
    }, 0)

    return ownership
      ? {
        ...record,
        ...ownership,
        members: record.members.length,
        awards
      }
      : {
        ...record,
        members: record.members.length,
        awards
      }
  })

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex ">Evento</h1>
        <h2 className="mt-1 text-xl">TOP 3</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap items-center mt-2">
          <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)" }} className=" h-[400px] w-[260px]  rounded-md mt-7 mb-5 md:mb-0  bg-[#292929]">
            <h3 className="text-xl mt-3 text-[#8a9597] flex justify-center">SEGUNDO</h3>
          </div>
          <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)" }} className=" h-[400px] w-[260px] rounded-md mb-5 md:mb-0 md:ml-5 bg-[#292929] justify-center ">
            <h3 className="text-xl mt-3 text-[#ffd700] flex justify-center">PRIMERO</h3>
          </div>
          <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)" }} className="h-[400px] w-[260px] rounded-md mt-5 mb-5 md:mb-0 md:ml-5 md:mt-10 bg-[#292929] ">
            <h3 className="text-xl mt-3 text-[#CD7F32] flex justify-center">TERCERO</h3>
          </div>
        </div>

        <h2 className="mt-1">TABLA GENERAL</h2>
        <Top columns={columns} values={records} />
      </div>
    </>
  )
}
