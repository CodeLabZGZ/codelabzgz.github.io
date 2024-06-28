"use client"

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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { joinTeam } from "@/actions/join-team"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del equipo debe tener al menos 2 caracteres."
  })
})

export function JoinTeam({ id }) {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values) {
    const { name } = values
    toast.promise(joinTeam({ id, name }), {
      loading: "Enviando solicitud...",
      success:
        "Petición enviada con éxito. Puede que el equipo tarde en aceptar tu petición",
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
                Enviar solicitud{" "}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
