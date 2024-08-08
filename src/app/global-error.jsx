"use client"

import { IconLink } from "@/components/landing/icon-link"
import { StarField } from "@/components/landing/star-field"

export default function GlobalError({ error, reset }) {
  return (
    <div className="relative isolate flex flex-auto flex-col items-center justify-center overflow-hidden bg-gray-950 text-center">
      <svg
        aria-hidden="true"
        className="absolute left-1/2 top-[-10vh] -z-10 h-[120vh] w-[120vw] min-w-[60rem] -translate-x-1/2"
      >
        <defs>
          <radialGradient id="gradient" cy="0%">
            <stop offset="0%" stopColor="rgba(255, 94, 0, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(135, 0, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
      </svg>
      <StarField className="sm:-mt-16" />

      <p className="font-display text-4xl/tight font-light text-white">500</p>
      <h1 className="mt-4 font-display text-xl/8 font-semibold text-white">
        Ha ocurrido un error
      </h1>
      <p className="mt-2 text-sm/6 text-gray-300">
        Lo sentimos, no hemos podido cargar la página que estabas buscando.
      </p>
      <IconLink href="/" className="mt-4" onClick={() => reset()}>
        Regresar
      </IconLink>
    </div>
  )
}
