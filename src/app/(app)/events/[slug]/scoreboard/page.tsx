import {
  TbDeviceGamepad,
  TbFlag3,
  TbLock,
  TbMapPin,
  TbMedal2,
  TbUsers,
  TbUsersGroup
} from "react-icons/tb"

import { Header } from "@/components/app/header"
import { getFileBySlug } from '@/lib/mdx'

export default async function page({ params: { slug } }) {
  const { meta, content } = await getFileBySlug(slug)

  return (
    <>
      <Header 
        title={meta.title}
        startDate={new Date(meta.startDate)}
        endDate={new Date(meta.endDate)}
      />
      <div className="grid grid-cols-2 gap-x-28">
        <aside className="max-w-prose space-y-4">
          <div className="">
            <img 
              src={meta.banner}
              alt={`Banner of the event ${meta.title}`}
              className="rounded aspect-video w-full"
            />
          </div>
          {content}
        </aside>
        <aside className="space-y-5">
          <section className="border border-gray-300 rounded p-6 space-y-6">
            <div className="flex items-center gap-x-4">
              <TbLock className="w-6 h-6"/>
              <div className="flex flex-col gap-y-1">
                <span className="uppercase text-xs font-medium">event type</span>
                <span className="capitalize font-semibold">{meta["info-eventType"]}</span>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <TbFlag3 className="w-6 h-6"/>
              <div className="flex flex-col gap-y-1">
                <span className="uppercase text-xs font-medium">format</span>
                <span className="capitalize font-semibold">{meta["info-format"]}</span>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <TbMapPin className="w-6 h-6"/>
              <div className="flex flex-col gap-y-1">
                <span className="uppercase text-xs font-medium">location</span>
                <span className="capitalize font-semibold">{meta["info-location"]}</span>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <TbUsers className="w-6 h-6"/>
              <div className="flex flex-col gap-y-1">
                <span className="uppercase text-xs font-medium">players</span>
                <span className="capitalize font-semibold">{0} players joined</span>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <TbUsersGroup className="w-6 h-6"/>
              <div className="flex flex-col gap-y-1">
                <span className="uppercase text-xs font-medium">teams</span>
                <span className="capitalize font-semibold">{0} teams joined</span>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <TbDeviceGamepad className="w-6 h-6"/>
              <div className="flex flex-col gap-y-1">
                <span className="uppercase text-xs font-medium">challenges</span>
                <span className="capitalize font-semibold">{0} challenges</span>
              </div>
            </div>
          </section>
          <section className="border border-gray-300 rounded p-6">
            <h3 className="text-xl font-bold">Event Prizes</h3>
            <div className="divide-y">
              <div className="flex items-center gap-x-4 py-3">
                <TbMedal2 className="w-6 h-6"/>
                <div className="flex flex-col gap-y-1">
                  <span className="uppercase text-xs font-medium">prize pool</span>
                  <span className="capitalize font-semibold">{meta["prizes-prizePool"]}</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 py-3">
                <h4 className="font-bold">1st Place</h4>
                <ul className="flex flex-col text-sm">
                  {meta["prizes-1stPlace"].map((item) => (
                    <li key={item} className="capitalize font-medium">[+] {item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-y-2 py-3">
                <h4 className="font-bold">2nd Place</h4>
                <ul className="flex flex-col text-sm">
                  {meta["prizes-2ndPlace"].map((item) => (
                    <li key={item} className="capitalize font-medium">[+] {item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-y-2 py-3">
                <h4 className="font-bold">3rd Place</h4>
                <ul className="flex flex-col text-sm">
                  {meta["prizes-3rdPlace"].map((item) => (
                    <li key={item} className="capitalize font-medium">[+] {item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-y-2 py-3">
                <h4 className="font-bold">Completed 1 or more Challenges </h4>
                <ul className="flex flex-col text-sm">
                  {meta["prizes-participation"].map((item) => (
                    <li key={item} className="capitalize font-medium">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="border border-gray-300 rounded p-6 space-y-6">
            <h3 className="text-xl font-bold">Event prerequisites</h3>
            <div className="flex flex-col gap-y-1">
              <span className="uppercase text-xs font-medium">max team size</span>
              <span className="capitalize font-semibold">{0} members</span>
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}
