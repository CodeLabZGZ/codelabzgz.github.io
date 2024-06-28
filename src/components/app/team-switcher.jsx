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
import useSWR, { useSWRConfig } from "swr"

import { CreateTeamForm } from "@/components/app/forms/create-team"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useParticipation } from "@/stores/participation"
import { useTeam } from "@/stores/team"
import { useSession } from "next-auth/react"

const GROUPS_INITIAL = [
  {
    label: "Accounts",
    show: false,
    values: []
  },
  {
    label: "Teams",
    show: true,
    values: []
  }
]

export function TeamSwitcher({ className }) {
  const [open, setOpen] = useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)
  const [groups, setGroups] = useState(GROUPS_INITIAL)

  const { data: session, status } = useSession()
  const { selectedTeam, setSelectedTeam } = useTeam()
  const { participation, setParticipation } = useParticipation()

  const { fetcher } = useSWRConfig()
  const { data } = useSWR(
    status === "authenticated"
      ? `/api/v1/teams?userId=${session.user.id}`
      : null,
    fetcher
  )

  useEffect(() => {
    if (!data) return

    const updatedGroups = GROUPS_INITIAL.map(group => {
      if (group.label === "Accounts") {
        group.values = [
          {
            id: session?.user?.id,
            image: session?.user?.image,
            label: session?.user?.name,
            value: session?.user?.email
          }
        ]
      }

      if (group.label === "Teams") {
        group.values = data.data.map(item => ({
          id: item.team.id,
          image: item.team.logo,
          label: item.team.name,
          value: item.team.name.replaceAll(" ", "-"),
          role: item.role
        }))
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
  }, [data, session, setParticipation, setSelectedTeam])

  const handleSelectTeam = ({ value, label }) => {
    setSelectedTeam(value)
    setParticipation({
      ...value,
      type: label === "Accounts" ? "account" : "team"
    })
    setOpen(false)
  }

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
                    group.show ? `${group.label} (${group.values.length})` : ""
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
}

function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0
}
