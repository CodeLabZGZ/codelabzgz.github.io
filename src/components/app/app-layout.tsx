"use client"

import { TbCirclePlus, TbUserPlus } from "react-icons/tb";

import { ButtonDialog } from "@/components/app/button"
import { CreateTeam } from "@/components/app/dialogs/create-team";
import { JoinTeam } from "./dialogs/join-team";
import Navbar from "@/components/app/navbar"
import Search from "@/components/app/search"
import { navigation } from "@/config/app"
import { usePathname } from "next/navigation"
import { useState } from 'react'

export default function AppLayout(
  { children }: { children: React.ReactNode}
) {
  const [openJoinTeam, setOpenJoinTeam] = useState(false)
  const [openCreateTeam, setOpenCreateTeam] = useState(false)

  const pathname = usePathname()
  const links = navigation.flatMap(i => i.navigation.map(s => s.href))
  const showNavigation = links.some(l => l === pathname)

  return (
    <div className="min-h-screen w-screen bg-gray-100 text-black overflow-hidden">
      <Navbar showNavigation={showNavigation}/>
      <main className="mx-auto max-w-7xl py-6 space-y-4">
        {showNavigation && 
          <div className="flex items-center justify-between mb-10">
            <Search />
            {(pathname === "/teams/all" || pathname === "/teams/my-teams") && 
              <div className="flex items-center justify-between gap-x-2.5">
                <ButtonDialog Icon={TbUserPlus} text="join team" state={openJoinTeam} setState={setOpenJoinTeam} dialog={<JoinTeam closeFx={() => setOpenJoinTeam(false)}/>} />
                <ButtonDialog Icon={TbCirclePlus} text="create team" state={openCreateTeam} setState={setOpenCreateTeam} dialog={<CreateTeam closeFx={() => setOpenCreateTeam(false)}/>}/>
              </div>
            }
          </div>
        }
        { children }
      </main>
    </div>
  )
}
