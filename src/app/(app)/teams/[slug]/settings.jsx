"use client"

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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  motto: z.string().min(2, {
    message: "El apodo debe tener al menos 2 caracteres.."
  }),
  description: z.string().min(2, {
    message: "La descripcion debe tener al menos 2 caracteres.."
  }),
  website: z.object({
    value: z.string().url(),
    visibility: z.enum(["public", "private"])
  }),
  twitter: z.object({
    value: z.string().url(),
    visibility: z.enum(["public", "private"])
  }),
  discord: z.object({
    value: z.string().url(),
    visibility: z.enum(["public", "private"])
  }),
  email: z.object({
    value: z.string().email(),
    visibility: z.enum(["public", "private"])
  })
})

export default function Settings () {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: { visibility: "public" },
      twitter: { visibility: "public" },
      discord: { visibility: "public" },
      email: { visibility: "public" }
    }
  })

  // 2. Define a submit handler.
  function onSubmit (values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del equipo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre oficial de tu equipo.
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
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre por el que tu equipo es conocido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Empieza aquí vuestra historia..." 
                  className="h-32"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Lore del equipo que verán el resto de usuarios al visitar tu equipo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website.value"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Página web</FormLabel>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="website-switch"
                    onChange={(e) => form.setValue("website.visibility", e.target.checked ? "private" : "public")}
                  />
                  <Label htmlFor="website-switch">Oculto al público</Label>
                </div>
              </div>
              <FormControl>
                <Input placeholder="https://www.example.com" {...field} />
              </FormControl>
              <FormDescription>
                Página oficial de tu equipo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter.value"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Twitter</FormLabel>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="twitter-switch"
                    onChange={(e) => form.setValue("twitter.visibility", e.target.checked ? "private" : "public")}
                  />
                  <Label htmlFor="twitter-switch">Oculto al público</Label>
                </div>
              </div>
              <FormControl>
                <Input placeholder="https://www.discord.gg" {...field} />
              </FormControl>
              <FormDescription>
                Enlace a la cuenta de Twitter de tu equipo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discord.value"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Discord</FormLabel>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="discord-switch"
                    onChange={(e) => form.setValue("discord.visibility", e.target.checked ? "private" : "public")}
                  />
                  <Label htmlFor="discord-switch">Oculto al público</Label>
                </div>
              </div>
              <FormControl>
                <Input placeholder="https://www.discord.gg" {...field} />
              </FormControl>
              <FormDescription>
                Invitación al chat de discord del equipo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email.value"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Correo electrónico</FormLabel>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="email-switch"
                    onChange={(e) => form.setValue("email.visibility", e.target.checked ? "private" : "public")}
                  />
                  <Label htmlFor="email-switch">Oculto al público</Label>
                </div>
              </div>
              <FormControl>
                <Input placeholder="hi@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Dirección de correo electrónico con la que contactar al equipo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar cambios</Button>
      </form>
    </Form>
  )
}
