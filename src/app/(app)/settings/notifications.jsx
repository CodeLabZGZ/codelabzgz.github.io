"use client"

import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { toast } from "sonner"

export default function Notifications({ data }) {
  function handleSubmit(key, value) {
    const promise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ [key]: value })
      }
    )
    toast.promise(promise, {
      loading: "loading...",
      success: "success",
      error: "error"
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <h3 className="mb-4 text-lg font-medium">
          Notificaciones por correo electrónico
        </h3>
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between gap-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base">Marketing</label>
              <p className="text-sm text-muted-foreground">
                Reciba correos electrónicos sobre nuevos eventos.
              </p>
            </div>
            <Switch
              defaultChecked={data.marketingEmails}
              onCheckedChange={e => handleSubmit("marketingEmails", Number(e))}
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base">Social</label>
              <p className="text-sm text-muted-foreground">
                Recibe correos electrónicos con solicitudes de amistad,
                seguidores y mucho más.
              </p>
            </div>
            <Switch
              defaultChecked={data.socialEmails}
              onCheckedChange={e => handleSubmit("socialEmails", e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base">Seguridad</label>
              <p className="text-sm text-muted-foreground">
                Reciba correos electrónicos sobre la actividad y seguridad de su
                cuenta.
              </p>
            </div>
            <Switch
              defaultChecked={data.securityEmails}
              onCheckedChange={e => handleSubmit("securityEmails", e)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="mb-4 text-lg font-medium">
          Consentimiento y Privacidad
        </h3>
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between gap-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base">Política de privacidad</label>
              <p className="text-sm text-muted-foreground">
                Estoy de acuerdo con la{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium underline underline-offset-4"
                >
                  política de privacidad
                </Link>{" "}
                que describe cómo se recopilan, utilizan y protegen mis datos
                personales durante los eventos.
              </p>
            </div>
            <Switch
              defaultChecked={data.privacyPolicy}
              onCheckedChange={e => handleSubmit("privacyPolicy", e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base">Derecho de imagen</label>
              <p className="text-sm text-muted-foreground">
                Entiendo que tengo derecho a decidir sobre el uso de mi imagen
                en materiales de marketing y puedo optar por no participar en la
                captura y uso de imágenes.
              </p>
            </div>
            <Switch
              defaultChecked={data.imageRight}
              onCheckedChange={e => handleSubmit("imageRight", e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
