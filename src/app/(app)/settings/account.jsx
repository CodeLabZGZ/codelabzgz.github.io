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
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
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
  urls: z
    .array(
      z.object({
        value: z.string().url()
      })
    )
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
      urls: data?.urls?.map(u => ({ value: u })) ?? [
        { value: "https://johndoe.github.io" },
        { value: "https://www.linkedin.com/in/johndoe" },
        { value: "https://github.com/johndoe" }
      ]
    }
  })

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control
  })

  // Función para verificar si hay campos vacíos
  const checkAndRemoveEmptyFields = () => {
    const urls = form.getValues("urls")
    const hasEmptyField = urls.some(field => field.value === "")
    if (hasEmptyField && urls.length > 1) {
      form.setValue(
        "urls",
        urls.filter(field => field.value !== "")
      )
    } else {
      setIsButtonDisabled(false)
    }
  }

  useEffect(() => {
    checkAndRemoveEmptyFields()
  })

  async function onSubmit(values) {
    const { createdAt, updatedAt, ...body } = {
      ...data,
      ...values,
      urls: values.urls.map(u => u.value)
    }

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
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

        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Añada enlaces a tu sitio web, blog o perfiles en redes
                    sociales.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={e => {
                        field.onChange(e)
                        checkAndRemoveEmptyFields()
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isButtonDisabled}
            onClick={() => {
              append({ value: "" })
              setIsButtonDisabled(true)
            }}
          >
            Añadir URL
          </Button>
        </div>
        <Button type="submit">Guardar cambios</Button>
      </form>
    </Form>
  )
}
