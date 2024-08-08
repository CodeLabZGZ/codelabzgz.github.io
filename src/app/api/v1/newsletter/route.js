import { getChunks } from "@/functions/newsletter/get-chunks"
import { getEvents } from "@/functions/newsletter/get-events"
import { getUsers } from "@/functions/newsletter/get-users"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"

/**
 * Calcula los timestamps del último día del año, el primer día de la semana que viene (lunes) y el último día de la semana que viene (domingo).
 *
 * @returns {Object} - Un objeto que contiene los timestamps correspondientes.
 * @property {number} endOfYear - Timestamp del último día del año.
 * @property {number} startOfNextWeek - Timestamp del primer día de la semana que viene (lunes).
 * @property {number} endOfNextWeek - Timestamp del último día de la semana que viene (domingo).
 */
function calculateTimestamps() {
  const now = new Date()

  // Último día del año
  const endOfYear = new Date(
    now.getFullYear(),
    11,
    31,
    23,
    59,
    59,
    999
  ).getTime()

  // Días desde el inicio de la semana (lunes) hasta hoy
  const dayOfWeek = now.getDay()
  // Ajuste porque getDay() devuelve 0 para domingo y 6 para sábado
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  // Primer día de la semana que viene (lunes)
  const daysUntilNextMonday = (7 - daysSinceMonday) % 7 // Días hasta el próximo lunes
  const startOfNextWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilNextMonday,
    0,
    0,
    0,
    0
  ).getTime()

  // Último día de la semana que viene (domingo)
  const endOfNextWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilNextMonday + 6,
    23,
    59,
    59,
    999
  ).getTime()

  return {
    endOfYear,
    startOfNextWeek,
    endOfNextWeek
  }
}

async function getHandler(request) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).end("Unauthorized")
  }
  const dates = calculateTimestamps()
  const fr = await getChunks({ days: 5 })
  const events = await getEvents({
    start: dates.startOfNextWeek,
    end: dates.endOfYear
  })
  const users = await getUsers({ limit: 10, offset: 0 })

  return response({
    data: {
      dates,
      fr,
      users,
      events: {
        nextWeek: events.filter(e => e.startDate <= dates.endOfNextWeek),
        upcoming: events.filter(e => e.startDate > dates.endOfNextWeek)
      }
    }
  })
}

export const GET = errorHandler(getHandler)
