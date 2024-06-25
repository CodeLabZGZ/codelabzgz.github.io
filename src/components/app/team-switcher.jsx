"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon
} from "@radix-ui/react-icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"

import { Button } from "@/components/ui/button"
import { CreateTeamForm } from "@/components/app/forms/create-team"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useTeam } from "@/stores/team"

const GROUPS = [
  {
    label: "Teams",
    teams: []
  }
]

const isEmptyObject = obj => obj && Object.keys(obj).length === 0;

export function TeamSwitcher ({ className }) {
  const [ open, setOpen ] = useState(false)
  const [ showNewTeamDialog, setShowNewTeamDialog ] = useState(false)
  const [ groups, setGroups ] = useState(GROUPS)
  
  const { data: session, status } = useSession()
  const { selectedTeam, setSelectedTeam } = useTeam()

  // load config and data
  const { fetcher } = useSWRConfig()
  const { data } = useSWR(status !== "loading" && `/api/v1/teams?userId=${session.user.id}`, fetcher)

  useEffect(() => {
    if (!data) return 

    const values = GROUPS.map(group => {
      if (group.label === "Teams") {
        group.teams = data.data.map(item => ({
          image: item.team.logo,
          label: item.team.name,
          value: item.team.name.replaceAll(" ","-"),
          role: item.role
        }))
      }

      return group;
    })
    setGroups(values)

    if (isEmptyObject(selectedTeam)) setSelectedTeam(groups.find(i => i.label === "Teams").teams[0])
  }, [data])
  

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedTeam &&
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={selectedTeam?.image}
                  alt={selectedTeam?.label}
                  className="grayscale"
                />
                <AvatarFallback className="uppercase">
                  {selectedTeam?.label?.split(" ").map(w => w[0]).slice(0,2)}
                </AvatarFallback>
              </Avatar>
            }
            <span className="truncate">
              {!selectedTeam ? "Sin equipo" : selectedTeam?.label}
            </span>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label + ` (${group.teams.length})`}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam.value === team.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <CreateTeamForm />
    </Dialog>
  )
}
