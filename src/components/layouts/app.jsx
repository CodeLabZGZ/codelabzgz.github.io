"use client"

import { MainNav } from "@/components/app/main-nav"
import { TeamSwitcher } from "@/components/app/team-switcher"
import { UserNav } from "@/components/app/user-nav"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command"
import { useShortcut } from "@/hooks/shortcut"
import { useCmk } from "@/stores/cmdk"
import { useTeam } from "@/stores/team"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { Link } from "next-view-transitions"
import { useRouter } from "next/navigation"
import {
  TbNotebook as Blog,
  TbCalendarMonth as Calendar,
  TbMoonStars as Dark,
  TbHelpSquare as Help,
  TbSun as Light,
  TbSettings as Settings,
  TbUsers as Team,
  TbUsersGroup as Teams,
  TbUser as User
} from "react-icons/tb"

export function AppLayout({ children }) {
  const router = useRouter()
  const { data: session } = useSession()
  const { open, setOpen } = useCmk()
  const { resolvedTheme, setTheme } = useTheme()
  const { selectedTeam } = useTeam()
  const otherTheme = resolvedTheme === "dark" ? "light" : "dark"
  useShortcut({
    key: "k",
    callback: () => setOpen(!open)
  })
  useShortcut({
    key: "p",
    callback: () => router.push(`/${session?.user?.id}`)
  })
  useShortcut({
    key: "t",
    callback: () =>
      router.push(selectedTeam ? `/teams/${selectedTeam?.value}` : "/teams")
  })
  useShortcut({
    key: "s",
    callback: () => router.push("/settings")
  })

  return (
    <div className="h-screen w-screen">
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
        <div className="mx-auto w-full max-w-4xl flex-1 space-y-4 p-8 pt-6">
          {children}
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escribe una opción o busca..." />
        <CommandList>
          <CommandEmpty>No se han encontrado resultados.</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            <CommandItem>
              <Link href="/events" className="flex w-full items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Eventos</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Link href="/teams" className="flex w-full items-center gap-2">
                <Teams className="h-4 w-4" />
                <span>Equipos</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Link href="/blog" className="flex w-full items-center gap-2">
                <Blog className="h-4 w-4" />
                <span>Blog</span>
              </Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Ajustes">
            <CommandItem>
              <Link
                href={`/${session?.user?.id}`}
                className="flex w-full items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span>Mi perfil</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </Link>
            </CommandItem>
            <CommandItem disabled={!selectedTeam}>
              <Link
                href={selectedTeam ? `/teams/${selectedTeam?.value}` : "/teams"}
                className="flex w-full items-center gap-2"
              >
                <Team className="h-4 w-4" />
                <span>Mi equipo</span>
                <CommandShortcut>⌘T</CommandShortcut>
              </Link>
            </CommandItem>
            <CommandItem>
              <Link href="/settings" className="flex w-full items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Ajustes</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Misc">
            <CommandItem>
              <a
                href="https://discord.gg/eAMGGMj3XW"
                className="flex w-full items-center gap-2"
              >
                <Help className="h-4 w-4" />
                Ayuda
              </a>
            </CommandItem>
            <CommandItem>
              <button
                className="flex w-full items-center gap-2"
                onClick={() => {
                  setTheme(otherTheme)
                }}
              >
                {resolvedTheme === "dark" ? (
                  <Dark className="h-4 w-4" />
                ) : (
                  <Light className="h-4 w-4" />
                )}
                <span>Cambiar tema</span>
              </button>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
