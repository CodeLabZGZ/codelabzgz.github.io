"use client"

import { TbChevronRight, TbSpy } from 'react-icons/tb'

import Link from 'next/link'

export function TeamCard({ teams }) {
  return (
    <ul className="divide-y divide-gray-100">
      {teams.map(({ id, logo, name, motto, role, players, challenges }) => (
        <li key={id}>
          <Link href={`/teams/${motto}`} className="relative w-full grid grid-cols-4 justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
            <div className="col-span-1 flex min-w-0 gap-x-4">
              {logo && <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={logo} alt={`${name} logo `} />}
              {!logo &&
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
                  <span className="text-lg font-medium leading-none text-white uppercase">
                    <TbSpy className="w-6 h-6"/>
                  </span>
                </span>
              }
              <div className="min-w-0 flex-auto">
                <p className="font-semibold leading-6 text-gray-900">
                  {name}
                </p>
                <p className="mt-1 flex text-sm leading-5 text-gray-500">
                  {motto}
                </p>
              </div>
            </div>
            {role && <div className="col-span-1 flex justify-end shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="capitalize text-sm leading-6 text-gray-900">{role}</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <p className="text-xs leading-5 text-gray-500 uppercase">team role</p>
                </div>
              </div>
            </div>}
            <div className="col-start-3 col-span-1 flex justify-end shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{players ?? 0} players</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <p className="text-xs leading-5 text-gray-500 uppercase">team members</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-end shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{challenges ?? 0} challenges</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <p className="text-xs leading-5 text-gray-500 uppercase">total challenges</p>
                </div>
              </div>
              <TbChevronRight className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
