"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email()
})

export default function Page() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  })

  useEffect(() => {
    let timer
    if (isDisabled) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer)
            setIsDisabled(false)
            return 0
          }
          return prevCountdown - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isDisabled])

  async function onSubmit(values) {
    setIsDisabled(true)
    const { email } = values
    await signIn("resend", { email, callbackUrl: "/events", redirect: false })
      .then(() =>
        toast.success(
          "Se ha enviado un enlace de inicio de sesión a tu dirección de correo."
        )
      )
      .catch(() =>
        toast.error(
          "Hemos tenido un error al enviar el correo. Por favor, prueba otro método para identificarte."
        )
      )

    setCountdown(5)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="max-w-sm px-6">
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
                onClick={() => signIn("github", { callbackUrl: "/events" })}
              >
                <TbBrandGithub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button
                variant="outline"
                onClick={() => signIn("discord", { callbackUrl: "/events" })}
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center">
                  <Button
                    type="submit"
                    className={`w-full ${isDisabled && "cursor-not-allowed"}`}
                    disabled={isDisabled}
                  >
                    {countdown > 0 && isDisabled
                      ? `Acceder (${countdown}s)`
                      : "Acceder"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
