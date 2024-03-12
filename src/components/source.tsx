"use client"

import { TbExternalLink } from "react-icons/tb";

export function Src({ text, link }: { text: string, link: string }) {
  return (
    <a
      href={link}
      className="w-fit group flex items-center gap-x-2 rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-300  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 duration-300"
      style={{textDecoration: "none"}}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
      <TbExternalLink className="w-4 h-4"/>
    </a>
  )
}