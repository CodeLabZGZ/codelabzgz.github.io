"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon
} from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

import { CreateTeamForm } from "@/components/app/teams/create-team"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { cn, isEmptyObject } from "@/lib/utils"
import { useParticipation } from "@/stores/participation"
import { useTeam } from "@/stores/team"
import { useSession } from "next-auth/react"

const GROUPS_INITIAL = [
  { label: "Accounts", values: [] },
  { label: "Teams", values: [], show: true }
]

export function TeamSwitcher({ className }) {
  const [open, setOpen] = useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)
  const [groups, setGroups] = useState(GROUPS_INITIAL)
  const [teamsData, setTeamsData] = useState(null)

  const { data: session, status } = useSession()
  const { selectedTeam, setSelectedTeam } = useTeam()
  const { participation, setParticipation } = useParticipation()

  useEffect(() => {
    if (status === "authenticated") {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}?members=true&populate=true`
      ).then(async res => {
        const { data } = await res.json()
        const teams = data.members.map(
          ({ team: { slug, image, name }, role }) => ({
            id: slug,
            image,
            label: name,
            value: slug,
            role
          })
        )
        setTeamsData(teams)
      })
    }
  }, [status, session])

  useEffect(() => {
    if (!teamsData || status !== "authenticated") return

    const updatedGroups = GROUPS_INITIAL.map(group => {
      if (group.label === "Accounts") {
        const { id, image, name, email } = session?.user
        group["values"] = [{ id, image, label: name, value: email }]
      } else if (group.label === "Teams") {
        group["values"] = teamsData
          .filter(item => item.role !== "pending")
          .map(item => ({ ...item }))
      }

      return group
    })
    setGroups(updatedGroups)

    if (isEmptyObject(participation)) {
      const accountsValues = updatedGroups.find(
        i => i.label === "Accounts"
      )?.values

      if (accountsValues && accountsValues.length > 0) {
        setParticipation(accountsValues[0])
      }
    }

    if (isEmptyObject(selectedTeam)) {
      const teamsValues = updatedGroups.find(i => i.label === "Teams")?.values
      if (teamsValues && teamsValues.length > 0) {
        setSelectedTeam(teamsValues[0])
      }
    }
  }, [
    teamsData,
    session,
    setParticipation,
    setSelectedTeam,
    participation,
    selectedTeam
  ])

  const handleSelectTeam = ({ value, label }) => {
    setSelectedTeam(value)
    setParticipation({
      ...value,
      type: label === "Accounts" ? "account" : "team"
    })
    setOpen(false)
  }

  return (
    status === "authenticated" && (
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
              <span className="truncate">
                {!participation ? "Sin equipo" : participation?.label}
              </span>
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search team..." />
                <CommandEmpty>No team found.</CommandEmpty>
                {groups.map(group => (
                  <CommandGroup
                    key={group.label}
                    heading={
                      group.show
                        ? `${group.label} (${group.values.length})`
                        : ""
                    }
                  >
                    {group.values.map(item => (
                      <CommandItem
                        key={item.value}
                        onSelect={() =>
                          handleSelectTeam({ value: item, label: group.label })
                        }
                        className="gap-2 text-sm"
                      >
                        <Avatar
                          image={item.image}
                          value={item.label}
                          className="h-5 w-5"
                        />
                        {item.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            participation.value === item.value
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
  )
}
