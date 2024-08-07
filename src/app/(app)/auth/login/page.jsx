import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Discord, Github } from "./buttons"

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="max-w-sm px-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Accede a la plataforma</CardTitle>
            <CardDescription>
              Introduce tu email a continuación para iniciar sesión.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Github />
              <Discord />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O continua con
                </span>
              </div>
            </div>
            <form
              className="space-y-4"
              action={async formData => {
                "use server"
                await signIn("resend", formData)
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="flex items-center">
                <Button type="submit" className="w-full">
                  Acceder
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
