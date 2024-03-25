"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { TbDoorExit, TbHelpSquare, TbUser, TbUsers } from "react-icons/tb"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export function UserNav () {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {!session
            ? (
              <Skeleton className="rounded-full">
                <div className="h-8 w-8 rounded-full"/>
              </Skeleton>
            )
            : (
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user.image} alt="@shadcn" />
                <AvatarFallback>{session?.user.name.split(" ")[0][0] + session?.user.name.split(" ")[1][0]}</AvatarFallback>
              </Avatar>
            )
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
            <Link href="/profile" className="w-full flex items-center gap-x-2.5">
              <TbUser className="w-4 h-4"/>
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/teams" className="w-full flex items-center gap-x-2.5">
              <TbUsers className="w-4 h-4"/>
              My Teams
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href="https://discord.gg/QHe9YYDtGf" className="w-full flex items-center gap-x-2.5">
              <TbHelpSquare className="w-4 h-4"/>
              Help
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => await signOut({ callbackUrl: "/" })}
          className="flex items-center gap-x-2.5 cursor-pointer"
        >
          <TbDoorExit className="w-4 h-4"/>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
