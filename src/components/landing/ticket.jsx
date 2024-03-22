"use client"

import "atropos/css"

import Atropos from "atropos/react"
import { Codelab } from "@/components/logos"
import { PyramidPattern } from "@/components/landing/patterns"

export function Ticket ({ number, date, options, brands }) {
  const dateTime = new Date(date)

  return (
    <div className="relative z-10 w-full h-auto mx-auto aspect-video rounded-2xl">
      <div className="h-full opacity-100 isolate aspect-video rounded-2xl">
        <div className="h-full sm:px-12 rounded-2xl">
          <Atropos id="ticket" className="block w-full h-auto mx-auto aspect-video rounded-2xl">
            <div className="block h-full overflow-hidden border-2 border-gray-400 dark:border-white opacity-100 rounded-2xl">
              <div className="relative flex flex-col items-center justify-center h-full overflow-hidden">
                <div className="absolute inset-0 flex items-start justify-center -z-50">
                  <div className="h-full w-full [mask-image:linear-gradient(black_10%,transparent)]">
                    <PyramidPattern />
                  </div>
                </div>
                <div>
                  <span className="sr-only">Tickets</span>
                  <div className="relative">
                    <Codelab />
                    <div className="absolute inset-0 opacity-80 contrast-125 blur-2xl animate-pulse">
                      <Codelab />
                    </div>
                  </div>
                </div>
                <div className="relative mt-4 text-center font-display font-semibold uppercase tracking-[0.2em] z-50">
                  <div className="absolute inset-0 -z-10 "/>
                  <h1 className="sr-only">Codelab</h1>
                  <time
                    dateTime={date}
                    className="z-50 flex items-center justify-center text-shadow-lg text-1rem/6 text-zinc-200"
                  >
                    {dateTime.toLocaleDateString("en-US", options)}
                    {false &&
                      <svg viewBox="0 0 2 2" className="mx-3 h-[0.1875rem] w-[0.1875rem] flex-none fill-white z-50">
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                    }
                  </time>
                  <div className="z-10 mt-1 leading-6 text-violet-300 text-shadow-xl uppercase">eina/codelab</div>
                </div>
              </div>
              {number && number > 0 &&
                <div className='absolute z-50 items-center overflow-hidden font-mono text-white p-4 left-2 top-2'>
                  <strong className='font-extrabold text-2xl'>
                    #{number ? number.toString().padStart(3, "0") : ""}
                  </strong>
                </div>
              }
              <div className='absolute left-0 bottom-0 p-5 font-mono flex flex-col gap-y-2.5'>
                <span className='text-xs text-left uppercase text-zinc-300'>
                  Gracias a:
                </span>
                <div className='flex items-center h-8 sm:h-6 lg:h-8 xl:h-10 gap-x-4'>
                  {brands.map(b => b)}
                </div>
              </div>
            </div>
          </Atropos>
        </div>
      </div>
    </div>
  )
}
