"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del equipo debe tener al menos 2 caracteres."
  })
})

export function JoinTeam({ teams }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  })

  async function onSubmit(values) {
    const { name } = values
    const team = teams.find(r => r.name === name)
    if (!team)
      return toast.error(
        <p>
          No existe el equipo <span className="font-bold">{name}</span>.
        </p>
      )

    const promise = axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/teams`,
      { team: team.slug },
      { "Content-Type": "application/json" }
    )

    toast.promise(promise, {
      loading: "Estamos procesando tu solicitud, espera un poco...",
      success: () => {
        router.refresh()
        return (
          <p>
            Solicitud enviada al equipo{" "}
            <span className="truncate whitespace-nowrap font-bold">{name}</span>
            .
          </p>
        )
      },
      error: err => err.message
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Únete al equipo</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Únete a un equipo</DialogTitle>
          <DialogDescription>
            Envía una solicitud al equipo que desees y espera la admisión para
            iniciar tu nueva aventura.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={form.handleSubmit(onSubmit)} className="space-y-3.5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del equipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Monkeys 51" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre oficial del equipo que deseas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="mt-3.5">
                Enviar solicitud
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
