"use client"

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
import { signOut, useSession } from "next-auth/react"
import {
  TbMoonStars as Dark,
  TbSun as Light,
  TbDoorExit,
  TbHelpSquare,
  TbUser,
  TbUsers
} from "react-icons/tb"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { useCmk } from "@/stores/cmdk"
import { useTeam } from "@/stores/team"
import { useTheme } from "next-themes"
import { Link } from "next-view-transitions"

export function UserNav() {
  const { data: session } = useSession()
  const { open, setOpen } = useCmk()
  const { resolvedTheme, setTheme } = useTheme()
  const otherTheme = resolvedTheme === "dark" ? "light" : "dark"
  const { selectedTeam } = useTeam()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {session && (
            <Avatar
              image={session?.user.image}
              value={session?.user.name}
              className="h-8 w-8"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/settings"
              className="flex w-full items-center gap-x-2.5"
            >
              <TbUser className="h-4 w-4" />
              Mi perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!selectedTeam}>
            <Link
              href={selectedTeam ? `/teams/${selectedTeam?.value}` : "/teams"}
              className="flex w-full items-center gap-x-2.5"
            >
              <TbUsers className="h-4 w-4" />
              Mi equipo
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href="https://discord.gg/QHe9YYDtGf"
              className="flex w-full items-center gap-x-2.5"
            >
              <TbHelpSquare className="h-4 w-4" />
              Ayuda
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
          >
            Menú de comandos
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(otherTheme)}
            className="cursor-pointer"
          >
            Tema
            <DropdownMenuShortcut>
              {resolvedTheme === "dark" ? (
                <Dark className="text-sm" />
              ) : (
                <Light className="text-sm" />
              )}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => await signOut({ callbackUrl: "/" })}
          className="flex cursor-pointer items-center gap-x-2.5"
        >
          <TbDoorExit className="h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
