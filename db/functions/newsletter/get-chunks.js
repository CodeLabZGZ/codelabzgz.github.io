import { db } from "@/db"
import { users } from "@/schemas"
import { count } from "drizzle-orm"

/**
 * Calcula y retorna la cantidad de correos electrónicos a procesar en función del número de días y el día actual.
 *
 * @async
 * @function getChunks
 * @param {Object} params - Los parámetros de entrada.
 * @param {number} params.days - El número de días durante los cuales se distribuirán los correos electrónicos.
 * @returns {Promise<number>} - La cantidad de correos electrónicos a procesar para el día actual.
 *
 * @description
 * La función calcula cuántos correos electrónicos se deben procesar por día basándose en el número total de usuarios
 * y el número de días especificado.
 * - Obtiene el número total de usuarios de la base de datos.
 * - Calcula la cantidad de correos electrónicos por día dividiendo el total de usuarios por el número de días.
 * - Retorna la cantidad de correos electrónicos para el día actual, teniendo en cuenta si el día de hoy
 *   es mayor que el número de días especificado o si es el último día del rango.
 *
 * Si no hay correos electrónicos por día (`emailsPerDay === 0`) y el día actual es mayor que 1, se retorna 0.
 * En caso contrario, se retorna la cantidad de correos electrónicos calculada para el día actual.
 * Si el día actual es el último día del rango, se calcula y retorna la cantidad restante de correos electrónicos.
 */
export async function getChunks({ days }) {
  const today = new Date().getDay()
  const [rows] = await db.select({ count: count() }).from(users)
  const emailsPerDay = Math.floor(rows.count / days)

  if (emailsPerDay === 0) {
    if (today > 1) return 0
    else return rows.count
  } else if (today === days) return rows.count - (today - 1) * emailsPerDay
  return emailsPerDay
}
