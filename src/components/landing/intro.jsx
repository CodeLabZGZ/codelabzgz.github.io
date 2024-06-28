import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaRegBuilding,
  FaXTwitter
} from "react-icons/fa6"

import { IconLink } from "@/components/landing/icon-link"
import { Codelab } from "@/components/logos"
import Link from "next/link"

const buttons = [
  {
    href: "https://github.com/CodeLabZGZ",
    icon: FaGithub,
    text: "GitHub"
  },
  {
    href: "https://www.linkedin.com/company/codelabzgz",
    icon: FaLinkedin,
    text: "LinkedIn"
  },
  {
    href: "https://www.instagram.com/codelabzgz/",
    icon: FaInstagram,
    text: "Instagram"
  }
]

export function IntroCard({ href, title, description, Icon }) {
  return (
    <a
      href={href}
      className="relative flex w-full cursor-pointer rounded-lg border border-white p-4 opacity-20 shadow-sm ring-2 ring-white duration-500 ease-in-out hover:scale-105 hover:opacity-100 focus:outline-none"
    >
      <div className="flex flex-1">
        <div className="flex flex-col">
          <span className="block text-sm font-medium capitalize text-gray-100">
            {title}
          </span>
          <span className="mt-1 flex items-center text-xs tracking-wide text-gray-300">
            {description}
          </span>
        </div>
      </div>
      <Icon className="h-5 w-5 text-gray-100" aria-hidden="true" />
    </a>
  )
}

export function Intro() {
  return (
    <>
      <div>
        <Link href="/">
          <Codelab icon={true} glass={true} fluid="#208D45" />
        </Link>
      </div>
      <h1 className="mt-14 font-display text-4xl/tight font-light text-white">
        Redefine tus límites.{" "}
        <span className="text-sky-300">Para fanáticos de la informática</span>
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        ¡CodeLab es la asociación de estudiantes de Informática de la EINA en
        Zaragoza! Eventos de alto nivel, hackatones emocionantes, meetups
        inspiradores y más.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <IntroCard
          key="Estudiantes"
          title="Estudiantes"
          description="Reunete en Discord"
          href="https://discord.gg/QHe9YYDtGf"
          Icon={FaDiscord}
        />
        <IntroCard
          key={"Empresas"}
          title="Empresas"
          description="Colabora con nosotros"
          href="mailto:codelabzgz@unizar.es"
          Icon={FaRegBuilding}
        />
      </div>
    </>
  )
}

export function IntroFooter() {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="flex flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2 lg:justify-start">
        {buttons.map(({ href, icon: Icon, text }) => (
          <IconLink key={href} href={href} icon={Icon}>
            {text}
          </IconLink>
        ))}
      </div>
      <p className="flex items-baseline gap-x-2 text-[0.8125rem]/6 text-gray-500">
        Gracias al trabajo de{" "}
        <IconLink href="https://twitter.com/CodeLabZGZ" icon={FaXTwitter}>
          CodeLab
        </IconLink>
      </p>
    </div>
  )
}
