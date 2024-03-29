import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn (...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = ({ date, timeZone, options }) => {
  return new Intl.DateTimeFormat("es-ES", {
    ...options,
    timeZone
  }).format(date)
}
