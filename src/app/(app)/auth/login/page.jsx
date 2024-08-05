"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb"

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form className="max-w-sm px-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Accede a la plataforma</CardTitle>
            <CardDescription>
              Introduce tu email a continuación para iniciar sesión.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={async () =>
                  await signIn("github", { callbackUrl: "/events" })
                }
              >
                <TbBrandGithub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button
                variant="outline"
                onClick={async () =>
                  await signIn("discord", { callbackUrl: "/events" })
                }
              >
                <TbBrandDiscord className="mr-2 h-4 w-4" />
                Discord
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O continua con
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Acceder</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
