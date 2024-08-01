import { auth } from "@/auth"
import {
  JoinLeaveButton,
  ShareButton
} from "@/components/app/events/info-buttons"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { getContentBySlug } from "@/lib/fetchers"
import { formatDateInfoEvent } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  TbPuzzle as Challenge,
  TbExternalLink as ExternalLink,
  TbFlag2 as Format,
  TbMapPin as Location,
  TbUsersGroup as Teams,
  TbTimeline as TimeLine,
  TbCloud as Type,
  TbUsers as Users
} from "react-icons/tb"

export default async function Page({ params: { slug } }) {
  const session = await auth()
  const { data: event, status } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}?challenges=true&participations=true`
  ).then(async res => {
    const data = await res.json()
    data["data"]["participating"] = data["data"].participations.some(
      e => e.user === session?.user.id
    )
    return { ...data }
  })

  if (status.code === 404 || !event) return notFound()
  const ec = await getContentBySlug(`events/${slug}`, "overview", ".mdx")

  return (
    <div className="mx-auto w-full">
      <section className="relative w-full space-y-4 pt-12 md:pt-24 lg:pt-32">
        <div>
          <h1 className="lg:leading-tighter text-3xl font-bold capitalize tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
            {event.title}
          </h1>
          <p className="mt-4 text-lg capitalize text-gray-500 dark:text-gray-400">
            {formatDateInfoEvent({
              endDateStr: event.endDate,
              startDateStr: event.startDate,
              location: event.location
            })}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <JoinLeaveButton
              event={event.slug}
              state={Boolean(event.participating)}
            />
            <ShareButton />
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/events/${slug}/scoreboard`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "icon"
                    })}
                  >
                    <TimeLine className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablón de resultados</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/events/${slug}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "icon"
                    })}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Página del evento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <hr className="absolute -bottom-4 w-full" />
      </section>
      <section className="w-full py-12">
        <div className="space-y-12">
          {event.banner && (
            <div className="mx-auto mt-4 w-2/3">
              <AspectRatio ratio={16 / 9} className="aspect-video bg-muted">
                <Image
                  src={event.banner}
                  alt="Photo by Drew Beamer"
                  fill
                  className="w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          )}
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <Type />
                <h3 className="text-lg font-bold">Tipo de Evento</h3>
              </div>
              <p className="text-sm capitalize text-gray-500 dark:text-gray-400">
                {event.visibility === "public" ? "Público" : "Privado"}
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <Format />
                <h3 className="text-lg font-bold">Formato</h3>
              </div>
              <p className="text-sm capitalize text-gray-500 dark:text-gray-400">
                {event.format}
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <Location />
                <h3 className="text-lg font-bold">Localización</h3>
              </div>
              <p className="text-sm capitalize text-gray-500 dark:text-gray-400">
                {event.location}
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <Users />
                <h3 className="text-lg font-bold">Asistentes</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-blold text-white">
                  {event.participations.filter(({ user }) => user).length}
                </span>{" "}
                Personas se han unido
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <Teams />
                <h3 className="text-lg font-bold">Equipos</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-blold text-white">
                  {event.participations.filter(({ team }) => team).length}
                </span>{" "}
                Equipos se han unido
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <Challenge />
                <h3 className="text-lg font-bold">Retos</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-blold text-white">
                  {event.challenges.filter(({ team }) => team).length}
                </span>{" "}
                Desafíos
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-12">{ec?.content}</section>
    </div>
  )
}
