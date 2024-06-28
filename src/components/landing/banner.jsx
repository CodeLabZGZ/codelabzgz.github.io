"use client"

import { HiXMark } from "react-icons/hi2"
import { useState } from "react"

export function Banner({ date, title, message, dot }) {
  const [show, setShow] = useState(true)

  const now = new Date().getTime()
  const [day, month, year] = date.split("-")
  const _date = new Date(Number(year), Number(month) - 1, Number(day)).getTime()

  if (now > _date) return null

  return (
    show && (
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 sm:flex sm:justify-center sm:px-6 sm:pt-5 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 ring-2 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm leading-6 text-white">
            <span>
              <strong className="font-semibold">{title}</strong>
              {dot && (
                <svg
                  viewBox="0 0 2 2"
                  className="mx-2 inline h-0.5 w-0.5 fill-current"
                  aria-hidden="true"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
              )}
              {message}
            </span>
          </p>
          <button
            type="button"
            className="-m-1.5 flex-none p-1.5"
            onClick={() => setShow(false)}
          >
            <span className="sr-only">Dismiss</span>
            <HiXMark className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    )
  )
}
