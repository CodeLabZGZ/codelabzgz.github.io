"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb"

export function Github() {
  return (
    <Button
      variant="outline"
      onClick={async () => await signIn("github", { callbackUrl: "/events" })}
    >
      <TbBrandGithub className="mr-2 h-4 w-4" />
      Github
    </Button>
  )
}

export function Discord() {
  return (
    <Button
      variant="outline"
      onClick={async () => await signIn("discord", { callbackUrl: "/events" })}
    >
      <TbBrandDiscord className="mr-2 h-4 w-4" />
      Discord
    </Button>
  )
}
