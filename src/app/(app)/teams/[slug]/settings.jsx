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
  image: z.string().url().optional().nullable(),
  name: z.string().trim().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  motto: z.string().trim().min(2, {
    message: "El apodo debe tener al menos 2 caracteres.."
  }),
  description: z.string().trim(),
  website: z
    .object({
      value: z.union([z.string().url(), z.literal("")]),
      visibility: z.enum(["public", "private"])
    })
    .optional(),
  twitter: z
    .object({
      value: z.union([z.string().url(), z.literal("")]),
      visibility: z.enum(["public", "private"])
    })
    .optional(),
  discord: z
    .object({
      value: z.union([z.string().url(), z.literal("")]),
      visibility: z.enum(["public", "private"])
    })
    .optional(),
  email: z.object({
    value: z.string().email(),
    visibility: z.enum(["public", "private"])
  })
})

export default function Settings(props) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...props,
      description: props.description ?? "",
      website: {
        visibility: props.websiteVisibility,
        value: props.website ?? ""
      },
      twitter: {
        visibility: props.twitterVisibility,
        value: props.twitter ?? ""
      },
      discord: {
        visibility: props.discordVisibility,
        value: props.discord ?? ""
      },
      email: { visibility: props.emailVisibility, value: props.email ?? "" }
    }
  })

  function onSubmit(values) {
    const { email, twitter, discord, website, ...rest } = values

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/teams/${props.slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...rest,
          email: email.value,
          emailVisibility: email.visibility,
          twitter: twitter.value,
          twitterVisibility: twitter.visibility,
          discord: discord.value,
          discordVisibility: discord.visibility,
          website: website.value,
          websiteVisibility: website.visibility,
          slug: props.slug
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
    form.setValue(`${key}.visibility`, visibilityValue)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://..." />
              </FormControl>
              <FormDescription>
                Esta será la imagen pública de tu equipo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
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
                    defaultChecked={props.websiteVisibility === "private"}
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
                    defaultChecked={props.twitterVisibility === "private"}
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
                    defaultChecked={props.discordVisibility === "private"}
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
                    defaultChecked={props.emailVisibility === "private"}
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
