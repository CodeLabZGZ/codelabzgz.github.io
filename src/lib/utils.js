import { clsx } from "clsx"
import { NextResponse } from "next/server"
import { message } from "statuses"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = ({ date, timeZone, options }) => {
  return new Intl.DateTimeFormat("es-ES", {
    ...options,
    timeZone
  }).format(date)
}

export const formatDateInfoEvent = ({ startDateStr, endDateStr, location }) => {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)
  const locale = "es-ES"

  const startMonth = startDate.toLocaleString(locale, { month: "short" })
  const startDay = startDate.getDate()
  const endMonth = endDate.toLocaleString(locale, { month: "short" })
  const endDay = endDate.getDate()
  const startYear = startDate.getFullYear()
  const endYear = endDate.getFullYear()

  let result = ""

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      result = `${startMonth} ${startDay}-${endDay} ${startYear} | ${location}`
    } else {
      result = `${startMonth} ${startDay}-${endMonth} ${endDay} ${startYear} | ${location}`
    }
  } else {
    result = `${startMonth} ${startDay} ${startYear}-${endMonth} ${endDay} ${endYear} | ${location}`
  }

  return result
}

export const response = ({
  data,
  code = 200,
  statusCode = 200,
  message: msg
}) => {
  return NextResponse.json(
    {
      data,
      status: {
        code: statusCode,
        message: msg ?? message[statusCode],
        timestamp: new Date().toISOString()
      }
    },
    { status: code ?? statusCode }
  )
}

export function formatNumber(num) {
  const units = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "K" }
  ]
  const result = units.find(u => num >= u.value)
  return result
    ? (num / result.value).toFixed(1).replace(/\.0$/, "") + " " + result.suffix
    : num.toString()
}

export function isEmptyObject(obj) {
  if (obj == null) return true // Verifica si es null o undefined
  if (Array.isArray(obj) || typeof obj === "string") return obj.length === 0 // Verifica si es un array o una cadena
  if (obj instanceof Set || obj instanceof Map) return obj.size === 0 // Verifica si es un Set o un Map
  if (typeof obj === "object") return Object.keys(obj).length === 0 // Verifica si es un objeto
  return false // En otros casos, no se considera vacío
}

/**
 * Custom website URL string validator against potential SSRF attacks
 * @param {string} val The URL to validate
 * @returns {boolean} whether the URL is a valid website
 */
export function validateWebsiteURL(val) {
  const ipRegex = /[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}/gm
  console.log(ipRegex.test(val.replace("/", "\\/")))

  // should be a secured HTTPS url and shouldn't contain IPs
  return val.startsWith("https://")
}

/**
 * Custom domain URL validator against potential SSRF attacks
 * @param {string} val The URL to validate
 * @param {string[]} allowedDomains The URL to validate
 * @returns {boolean} whether the URL is a valid website
 */
export function validateDomainURL(val, allowedDomains) {
  if (allowedDomains.length == 0) return false

  // should contain one of the allowed domains.
  for (const domain of allowedDomains) {
    const domainRegex = new RegExp(
      `https://${domain.replace(".", "\\.")}(/[a-zA-Z0-9_/]*)?$`
    )
    if (domainRegex.test(val)) return true
  }

  return false
}
