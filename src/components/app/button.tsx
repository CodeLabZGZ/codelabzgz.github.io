import { type IconType } from "react-icons"

export default function button({ Icon, text }: { Icon: IconType, text: string }) {
  return (
    <button className="whitespace-nowrap relative block w-full rounded-md border-0 bg-white py-2 pl-10 pr-3 text-gray-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs uppercase font-bold sm:leading-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      {text}
    </button>
  )
}
