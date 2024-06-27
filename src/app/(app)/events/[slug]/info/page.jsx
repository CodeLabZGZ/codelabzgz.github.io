import {
  TbPuzzle as Challenge,
  TbFlag2 as Format,
  TbMapPin as Location,
  TbUsersGroup as Teams,
  TbCloud as Type,
  TbUsers as Users
} from "react-icons/tb"
import { JoinLeaveButton, ShareButton } from "@/components/app/tables/events/info-buttons"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { auth } from "@/auth"
import { db } from "@/db"
import { formatDateInfoEvent } from "@/lib/utils"
import { getContentBySlug } from "../fetchers"
import { notFound } from "next/navigation"
import { sql } from "drizzle-orm"

export default async function Page({ params: { slug }}) {
  const { user } = await auth()
  const [ event ] = db.all(sql`
    SELECT
      e.*,
      MAX(CASE WHEN p.user = ${user.id} THEN 1 ELSE 0 END) AS participating,
      COALESCE(te.total_teams, 0) AS total_teams,
      COALESCE(tp.total_people, 0) AS total_people,
      COALESCE(tr.total_challenges, 0) AS total_challenges
    FROM
      events e
      LEFT JOIN participations p ON p.event = e.id
      LEFT JOIN (
        SELECT event, COUNT(DISTINCT team) AS total_teams
        FROM participations
        GROUP BY event
      ) te ON e.id = te.event
      LEFT JOIN (
        SELECT event, COUNT(DISTINCT user) AS total_people
        FROM participations
        GROUP BY event
      ) tp ON e.id = tp.event
      LEFT JOIN (
        SELECT event, COUNT(*) AS total_challenges
        FROM challenges
        GROUP BY event
      ) tr ON e.id = tr.event
    WHERE
      e.title = ${slug.replaceAll("-", " ")}
    GROUP BY
      e.id, te.total_teams, tp.total_people, tr.total_challenges;
  `)

  if (!event) return notFound()
  const eventContent = await getContentBySlug(slug, "overview", ".mdx")
  
  return (
    <div className="w-full mx-auto">
      <section className="relative w-full pt-12 md:pt-24 lg:pt-32 space-y-4">
        <div>
          <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] capitalize">
          {event.title}
          </h1>
          <p className="capitalize text-lg text-gray-500 dark:text-gray-400 mt-4">{formatDateInfoEvent({endDateStr: event.endDate, startDateStr: event.startDate, location: event.location})}</p>
        </div>
        <div className="flex items-center gap-2">
          <JoinLeaveButton event={event.id} state={Boolean(event.participating)} />
          <ShareButton />
        </div>
        <hr className="absolute -bottom-4 w-full "/>
      </section>
      <section className="w-full py-12">
        <div className="space-y-12">
          {event.banner && 
            <div className="w-2/3 mx-auto mt-4">
              <AspectRatio ratio={16 / 9} className="bg-muted aspect-video">
                <Image
                  src={event.banner}
                  alt="Photo by Drew Beamer"
                  fill
                  className="rounded-md object-cover w-full"
                  />
              </AspectRatio>
            </div>
          }
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Type/>
                  <h3 className="text-lg font-bold">Tipo de Evento</h3>
                </div>
                <p className="capitalize text-sm text-gray-500 dark:text-gray-400">
                  {event.visibility === "public" ? "Público" : "Privado"}
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Format/>
                  <h3 className="text-lg font-bold">Formato</h3>
                </div>
                <p className="capitalize text-sm text-gray-500 dark:text-gray-400">
                  {event.type}
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Location/>
                  <h3 className="text-lg font-bold">Localización</h3>
                </div>
                <p className="capitalize text-sm text-gray-500 dark:text-gray-400">
                  {event.location}
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Users/>
                  <h3 className="text-lg font-bold">Asistentes</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-blold text-white">{event.total_people}</span> Personas se han unido
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Teams/>
                  <h3 className="text-lg font-bold">Equipos</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-blold text-white">{event.total_teams}</span> Equipos se han unido
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Challenge/>
                  <h3 className="text-lg font-bold">Retos</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-blold text-white">{event.total_challenges}</span> Desafíos
                </p>
              </div>
            </div>
          </div>
      </section>
      <section className="space-y-12">
        {eventContent?.content}
      </section>
    </div>
  )
}
