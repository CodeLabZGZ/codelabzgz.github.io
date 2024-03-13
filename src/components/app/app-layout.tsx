"use client"

import {HiOutlinePlusCircle, HiOutlineUserPlus} from "react-icons/hi2"

import Button from "@/components/app/button"
import Navbar from "@/components/app/navbar"
import Search from "@/components/app/search"
import { navigation } from "@/config/app"
import { usePathname } from "next/navigation"

export default function AppLayout(
  { children }: { children: React.ReactNode}
) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen w-screen bg-gray-100 text-black">
      <Navbar />
      <main className="mx-auto max-w-7xl py-6 space-y-4">
        <div className="flex items-center justify-between">
          <Search />
          {pathname === navigation[1].href && 
            <div className="flex items-center justify-between gap-x-2.5">
              <Button Icon={HiOutlineUserPlus} text="join team"/>
              <Button Icon={HiOutlinePlusCircle} text="create team"/>
            </div>
          }
        </div>
        { children }
      </main>
    </div>
  )
}
