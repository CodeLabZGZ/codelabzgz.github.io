"use client"

import { MainNav } from "@/components/app/main-nav"
import { TeamSwitcher } from "@/components/app/team-switcher"
import { UserNav } from "@/components/app/user-nav"

export function AppLayout ({ children }) {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col">
        {/* navbar */}
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        {/* your content */}
        <div className="max-w-4xl w-full mx-auto flex-1 space-y-4 p-8 pt-6">
          { children }
        </div>
      </div>
    </div>
  )
}
