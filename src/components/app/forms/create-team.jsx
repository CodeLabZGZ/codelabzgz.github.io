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
import { createTeam } from "@/actions/create-team"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del equipo debe tener al menos 2 caracteres."
  }),
  motto: z.string().min(2, {
    message: "El apodo debe tener al menos 2 caracteres."
  }),
  slug: z.string().min(2, {
    message: "El slug debe tener al menos 2 caracteres."
  })
})

export function CreateTeamForm() {
  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values) {
    const { name, motto, slug } = values
    toast.promise(createTeam({ id, name, motto, slug }), {
      loading: "Estamos creando tu equipo...",
      success: ({ name, slug }) => (
        <>
          Tu equipo{" "}
          <a
            href={`/teams/${slug}`}
            target="_black"
            referrerPolicy="no-referrer"
          >
            <strong>{name}</strong>
          </a>{" "}
          ha sido creado.
        </>
      ),
      error: err => err.message
    })
    setOpen(false)
  }

  return (
    <DialogContent
      className="sm:max-w-[425px]"
      onInteractOutside={e => e.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle>Crea tu equipo</DialogTitle>
        <DialogDescription>
          Comienza con la creación de tu equipo y haz que este comience a ganar
          reputación.
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
                  Este será el nombre oficial de tu equipo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apodo</FormLabel>
                <FormControl>
                  <Input placeholder="Bananas" {...field} />
                </FormControl>
                <FormDescription>
                  Nombre por el que tu equipo se hará conocido.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="bananas" {...field} />
                </FormControl>
                <FormDescription>
                  Enlace personalizado para acceder a tu equipo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="mt-3.5">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export function CreateTeam({ id }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Crear equipo</Button>
      </DialogTrigger>
      <CreateTeamForm />
    </Dialog>
  )
}
