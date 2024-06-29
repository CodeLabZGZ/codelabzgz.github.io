"use client"

import "atropos/css"

import { PyramidPattern } from "@/components/landing/patterns"
import { Codelab } from "@/components/logos"
import Atropos from "atropos/react"

export function Ticket({ number, date, options, brands }) {
  const dateTime = new Date(date)

  return (
    <div className="relative z-10 mx-auto aspect-video h-auto w-full rounded-2xl">
      <div className="isolate aspect-video h-full rounded-2xl opacity-100">
        <div className="h-full rounded-2xl sm:px-12">
          <Atropos
            id="ticket"
            className="rounded-6xl mx-auto block aspect-video h-auto w-full"
          >
            <div className="-z-50 h-[266px] w-[476px] rounded-2xl bg-black opacity-85">
              <div className="block h-full overflow-hidden rounded-2xl border-2 border-gray-400 opacity-100 dark:border-white">
                <div className="relative flex h-full flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 -z-50 flex items-start justify-center">
                    <div className="[mask-image:linear-gradient(black_10%,transparent) rounded-2xl] h-full w-full">
                      <PyramidPattern />
                    </div>
                  </div>
                  <div>
                    <span className="sr-only">Tickets</span>
                    <div className="relative">
                      <Codelab />
                      <div className="absolute inset-0 animate-pulse opacity-80 blur-2xl contrast-125">
                        <Codelab />
                      </div>
                    </div>
                  </div>
                  <div className="relative z-50 mt-4 text-center font-display font-semibold uppercase tracking-[0.2em]">
                    <div className="absolute inset-0 -z-10" />
                    <h1 className="sr-only">Codelab</h1>
                    <time
                      dateTime={date}
                      className="text-shadow-lg text-1rem/6 z-50 flex items-center justify-center text-white"
                    >
                      {dateTime.toLocaleDateString("en-US", options)}
                    </time>
                    <div className="text-shadow-xl z-10 mt-1 uppercase leading-6 text-violet-300">
                      eina/codelab
                    </div>
                  </div>
                </div>
                {number && number > 0 && (
                  <div className="absolute left-2 top-2 z-50 items-center overflow-hidden p-4 font-mono text-white">
                    <p className="text-2xl font-extrabold text-white">
                      #{number ? number.toString().padStart(3, "0") : ""}
                    </p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 flex flex-col gap-y-2.5 p-5 font-mono">
                  <span className="text-left text-xs uppercase text-white">
                    Gracias a:
                  </span>
                  <div className="flex h-8 items-center gap-x-4 sm:h-6 lg:h-8 xl:h-10">
                    {brands.map(b => b)}
                  </div>
                </div>
              </div>
            </div>
          </Atropos>
        </div>
      </div>
    </div>
  )
}
