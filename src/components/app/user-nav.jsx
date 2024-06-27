"use client"

import {
   TbMoonStars as Dark,
   TbSun as Light
} from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { TbDoorExit, TbHelpSquare, TbUser, TbUsers } from "react-icons/tb"
import { signOut, useSession } from "next-auth/react"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useCmk } from "@/stores/cmdk"
import { useTeam } from "@/stores/team";
import { useTheme } from "next-themes"

export function UserNav () {
  const { data: session } = useSession()
  const { open, setOpen } = useCmk();
  const { resolvedTheme, setTheme } = useTheme()
  const otherTheme = resolvedTheme === "dark" ? "light" : "dark"
  const { selectedTeam } = useTeam()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {session &&
            <Avatar 
              image={session?.user.image}
              value={session?.user.name}
              className="w-8 h-8"
            />
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/settings" className="w-full flex items-center gap-x-2.5">
              <TbUser className="w-4 h-4"/>
              Mi perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!selectedTeam}>
            <Link href={selectedTeam ? `/teams/${selectedTeam?.value}` : "/teams"} className="w-full flex items-center gap-x-2.5">
              <TbUsers className="w-4 h-4"/>
              Mi equipo
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href="https://discord.gg/QHe9YYDtGf" className="w-full flex items-center gap-x-2.5">
              <TbHelpSquare className="w-4 h-4"/>
              Ayuda
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setOpen(!open)}>
            Menú de comandos
            <DropdownMenuShortcut>
              ⌘K
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(otherTheme)}>
            Tema
            <DropdownMenuShortcut>
              {resolvedTheme === "dark" 
                ? <Dark className="text-sm" />
                : <Light className="text-sm" /> 
            }
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => await signOut({ callbackUrl: "/" })}
          className="flex items-center gap-x-2.5 cursor-pointer"
        >
          <TbDoorExit className="w-4 h-4"/>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
