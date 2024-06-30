"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const notificationsFormSchema = z.object({
  socialEmails: z.boolean().default(false).optional(),
  marketingEmails: z.boolean().default(false).optional(),
  securityEmails: z.boolean().default(false)
})

const privacyFormSchema = z.object({
  privacyPolicy: z.boolean().default(true).optional(),
  imageRight: z.boolean().default(true).optional()
})

export default function Notifications({ data }) {
  const notificationsForm = useForm({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      marketingEmails: false,
      socialEmails: false,
      securityEmails: false
    }
  })

  const onSubmitNotifications = data => {
    console.log(data)
  }

  const privacyForm = useForm({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      privacyPolicy: true,
      imageRight: true
    }
  })

  const onSubmitPrivacy = data => {
    console.log(data)
    // Aquí podrías enviar los datos a tu backend o procesarlos según sea necesario
  }

  return (
    <Form {...notificationsForm}>
      <form
        onSubmit={notificationsForm.handleSubmit(onSubmitNotifications)}
        className="space-y-8"
      >
        <h3 className="mb-4 text-lg font-medium">
          Notificaciones por correo electrónico
        </h3>
        <div className="space-y-4">
          <FormField
            control={notificationsForm.control}
            name="marketingEmails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Marketing</FormLabel>
                  <FormDescription>
                    Reciba correos electrónicos sobre nuevos eventos.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={notificationsForm.control}
            name="socialEmails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Social</FormLabel>
                  <FormDescription>
                    Recibe correos electrónicos con solicitudes de amistad,
                    seguidores y mucho más.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={notificationsForm.control}
            name="securityEmails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Seguridad</FormLabel>
                  <FormDescription>
                    Reciba correos electrónicos sobre la actividad y seguridad
                    de su cuenta.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                    disabled
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Guardar cambios</Button>
      </form>

      <form
        onSubmit={privacyForm.handleSubmit(onSubmitPrivacy)}
        className="space-y-8"
      >
        <h3 className="mb-4 text-lg font-medium">
          Consentimiento y Privacidad
        </h3>
        <div className="space-y-4">
          <FormField
            control={privacyForm.control}
            name="privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Política de privacidad
                  </FormLabel>
                  <FormDescription>
                    Estoy de acuerdo con la política de privacidad que describe
                    cómo se recopilan, utilizan y protegen mis datos personales
                    durante los eventos.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={privacyForm.control}
            name="imageRight"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Derecho de imagen</FormLabel>
                  <FormDescription>
                    Entiendo que tengo derecho a decidir sobre el uso de mi
                    imagen en materiales de marketing y puedo optar por no
                    participar en la captura y uso de imágenes.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Guardar cambios</Button>
      </form>
    </Form>
  )
}
