"use client"

import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { validateDomainURL, validateWebsiteURL } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  description: z.string().max(160).optional(),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  email: z
    .string({ required_error: "Please select an email to display." })
    .email(),
  website: z.union([
    z.string().url().refine(validateWebsiteURL, {
      message:
        "La página web debe tener dominio público y permitir sólo conexión HTTPS"
    }),
    z.literal("")
  ]),
  twitter: z
    .union([
      z
        .string()
        .url()
        .refine(val => validateDomainURL(val, ["twitter.com", "x.com"]), {
          message:
            "La página web apuntar a un dominio de Twitter y permitir sólo conexión HTTPS"
        }),
      z.literal("")
    ])
    .optional(),
  discord: z
    .union([
      z
        .string()
        .url()
        .refine(
          val =>
            validateDomainURL(val, [
              "discord.com",
              "discord.gg",
              "discordapp.com"
            ]),
          {
            message:
              "La página web debe apuntar a un dominio de Discord y permitir sólo conexión HTTPS"
          }
        ),
      z.literal("")
    ])
    .optional()
})

export default function Account({ data }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: data?.name ?? "",
      description: data?.description ?? "",
      username: data?.username ?? data?.name ?? "",
      email: data?.email,
      website: data?.website,
      twitter: data?.twitter,
      discord: data?.discord
    }
  })

  async function onSubmit(values) {
    console.log("v", values)
    const { createdAt, updatedAt, ...body } = {
      ...data,
      ...values
    }

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${data.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    )

    toast.promise(promise, {
      loading: "Estamos procesando tu solicitud, espera un poco...",
      success: "Se han guardado los cambios.",
      error: err => err.message
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
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
                  placeholder="Cuéntale al mundo un poco sobre ti"
                  className="h-24 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                Este es tu nombre público. Puede ser su nombre real o un
                seudónimo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Página web</FormLabel>
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
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input placeholder="https://www.example.com" {...field} />
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
          name="discord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord</FormLabel>
              <FormControl>
                <Input placeholder="https://www.example.com" {...field} />
              </FormControl>
              <FormDescription>
                Invitación al chat de discord del equipo.
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
