"use client"

import { TbExternalLink } from "react-icons/tb"

export function Src({ text, link }) {
  return (
    <a
      href={link}
      className="group flex w-fit items-center gap-x-2 rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 duration-300 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
      style={{ textDecoration: "none" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
      <TbExternalLink className="h-4 w-4" />
    </a>
  )
}
