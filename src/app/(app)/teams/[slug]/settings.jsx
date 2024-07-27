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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  motto: z.string().trim().min(2, {
    message: "El apodo debe tener al menos 2 caracteres.."
  }),
  slug: z
    .string()
    .trim()
    .min(2, {
      message: "El slug debe tener al menos 2 caracteres.."
    })
    .toLowerCase()
    .regex(new RegExp(/^[A-Za-z\d_-\s]*$/)),
  description: z.string().trim().min(2, {
    message: "La descripcion debe tener al menos 2 caracteres.."
  }),
  website: z.object({
    value: z.union([z.string().url(), z.literal("")]),
    visibility: z.enum(["public", "private"])
  }),
  twitter: z.object({
    value: z.union([z.string().url(), z.literal("")]),
    visibility: z.enum(["public", "private"])
  }),
  discord: z.object({
    value: z.union([z.string().url(), z.literal("")]),
    visibility: z.enum(["public", "private"])
  }),
  email: z.object({
    value: z.string().email(),
    visibility: z.enum(["public", "private"])
  })
})

export default function Settings(values) {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...values,
      teamDescription: values.teamDescription ?? "",

      website: {
        visibility: values.websiteVisibility,
        value: values.website ?? ""
      },
      twitter: {
        visibility: values.twitterVisibility,
        value: values.twitter ?? ""
      },
      discord: {
        visibility: values.discordVisibility,
        value: values.discord ?? ""
      },
      email: { visibility: values.emailVisibility, value: values.email ?? "" }
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    const replacedSlug = values.slug.replaceAll(" ", "-")
    console.log(replacedSlug)
    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/teams/${values.name}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          slug: replacedSlug
        })
      }
    )
    toast.promise(promise, {
      loading: "loading...",
      success: "success",
      error: "error"
    })
  }

  function onSwitch(key, checked) {
    const visibilityValue = checked ? "private" : "public"
    form.setValue("website.visibility", visibilityValue)
    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/teams/${values.name}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ [key]: { visibility: visibilityValue } })
      }
    )
    toast.promise(promise, {
      loading: "loading...",
      success: "success",
      error: "error"
    })
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
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enlace personalizado para acceder a tu equipo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamDescription"
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
                Lore del equipo que verán el resto de usuarios al visitar tu
                equipo.
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
                    defaultChecked={values.websiteVisibility === "private"}
                    onCheckedChange={e => onSwitch("website", e)}
                  />
                  <Label htmlFor="website-switch">Oculto al público</Label>
                </div>
              </div>
              <FormControl>
                <Input placeholder="https://www.example.com" {...field} />
              </FormControl>
              <FormDescription>Página oficial de tu equipo.</FormDescription>
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
                    defaultChecked={values.twitterVisibility === "private"}
                    onCheckedChange={e => onSwitch("twitter", e)}
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
                    defaultChecked={values.discordVisibility === "private"}
                    onCheckedChange={e => onSwitch("discord", e)}
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
                    defaultChecked={values.emailVisibility === "private"}
                    onCheckedChange={e => onSwitch("email", e)}
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
