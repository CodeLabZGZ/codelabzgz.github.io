import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  TbPuzzle as Challenge,
  TbFlag2 as Format,
  TbMapPin as Location,
  TbUsersGroup as Teams,
  TbCloud as Type,
  TbUsers as Users
} from "react-icons/tb"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Share2Icon } from "@radix-ui/react-icons"

export default function Page({ params: {slug} }) {
  return (
    <div className="w-full mx-auto">
      <section className="relative w-full pt-12 md:pt-24 lg:pt-32 space-y-4">
        <div>
          <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] capitalize">
          {slug.replaceAll("-", " ")}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">Dec 1-25 2024 | Zaragoza, ES</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            Apuntarse
          </Button>
          <Button
            variant="outline"
            className="gap-1"
          >
            <Share2Icon/>
            Compartir
          </Button>
        </div>
        <hr className="absolute -bottom-4 w-full "/>
      </section>
      <section className="w-full py-12">
        <div className="space-y-12">
          <div className="w-2/3 mx-auto mt-4">
            <AspectRatio ratio={16 / 9} className="bg-muted aspect-video">
              <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Photo by Drew Beamer"
                fill
                className="rounded-md object-cover w-full"
                />
            </AspectRatio>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Type/>
                  <h3 className="text-lg font-bold">Tipo de Evento</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Público
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Format/>
                  <h3 className="text-lg font-bold">Hackathon</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hackathon
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Location/>
                  <h3 className="text-lg font-bold">Localización</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  EINA
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Users/>
                  <h3 className="text-lg font-bold">Asistentes</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-blold text-white">15</span> personas se han unido
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Teams/>
                  <h3 className="text-lg font-bold">Equipos</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-blold text-white">4</span> equipos se han unido
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Challenge/>
                  <h3 className="text-lg font-bold">Retos</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-blold text-white">25</span> retos repartidos en <span className="font-blold text-white">5</span> categorías
                </p>
              </div>
            </div>
          </div>
      </section>
      <section className="w-full py-12">
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="secondary">
              Topics Covered
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Áreas de conocimiento </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nuestro evento abarcará una amplia gama de temas del mundo de la codificación y el desarrollo de software, incluyendo:
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Desarrollo web</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Conoce los últimos frameworks y las mejores prácticas para crear aplicaciones web modernas.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Desarrollo móvil</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Explore las herramientas y técnicas para crear aplicaciones móviles multiplataforma.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Ciencia de datos</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sumérjase en el mundo del análisis de datos, el aprendizaje automático y la inteligencia artificial.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Ciberseguridad</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Conozca las últimas amenazas y las mejores prácticas para proteger sus aplicaciones y datos.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">DevOps</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Explore las herramientas y técnicas para automatizar el proceso de desarrollo e implantación de software.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Computación en la nube</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aprende a aprovechar los servicios y la infraestructura basados en la nube para crear aplicaciones escalables.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12">
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="secondary">
                Agenda
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Qué Esperar</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nuestro evento de 3 días contará con una gran variedad de sesiones, talleres y oportunidades para establecer contactos. Consulte
              el programa que figura a continuación:
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4">
            {[23, 24,25].map((i) => (
              <Card key={i}>
                <CardContent className="p-4 gap-4 grid grid-cols-[100px_1fr] items-start">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-2xl font-bold">{i}</div>
                    <div className="text-sm text-muted-foreground">Dec</div>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold">Cybersecurity Workshop</h3>
                    <p className="text-sm text-muted-foreground">1:00 PM - 4:00 PM</p>
                    <p className="text-sm text-muted-foreground">
                      Aprenda a proteger sus aplicaciones y datos de las últimas ciberamenazas, y explore las herramientas y técnicas utilizadas por los profesionales de la seguridad.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
