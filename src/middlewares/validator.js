import { BadRequestException } from "@/lib/api-errors"

/**
 * Middleware de validación para solicitudes HTTP.
 *
 * @param {Function} fn - Función manejadora de la solicitud que se ejecutará después de la validación.
 * @param {Object} schemas - Esquemas de validación para diferentes partes de la solicitud.
 * @param {Object} [schemas.headers] - Esquema de validación para los encabezados de la solicitud.
 * @param {Object} [schemas.path] - Esquema de validación para los parámetros de la ruta.
 * @param {Object} [schemas.query] - Esquema de validación para los parámetros de consulta.
 * @param {Object} [schemas.body] - Esquema de validación para el cuerpo de la solicitud.
 * @returns {Function} Middleware de validación que procesa la solicitud y la pasa a la función manejadora si es válida.
 * @throws {BadRequestException} Si alguna parte de la solicitud no pasa la validación.
 */
export const validator = (fn, schemas) => async (req, ctx) => {
  // Validar encabezados
  if (schemas.headers) {
    const headers = Object.fromEntries(req.headers.entries())
    const headersResult = schemas.headers.safeParse(headers)
    console.log(`[VALIDATOR][QUERY]:`, JSON.stringify(headersResult, null, 2))
    if (!headersResult.success) {
      throw new BadRequestException()
    }
    req.validatedHeaders = headersResult.data
  }

  // Validar parámetros de ruta (si existen)
  if (schemas.path) {
    const { params } = ctx
    const pathResult = schemas.path.safeParse(params)
    console.log(`[VALIDATOR][QUERY]:`, JSON.stringify(pathResult, null, 2))
    if (!pathResult.success) {
      throw new BadRequestException()
    }
    req.validatedParams = pathResult.data
  }

  // Validar query params
  if (schemas.query) {
    const url = new URL(req.nextUrl)
    const queryParams = Object.fromEntries(url.searchParams.entries())
    const queryParamsResult = schemas.query.safeParse(queryParams)
    console.log(
      `[VALIDATOR][QUERY]:`,
      JSON.stringify(queryParamsResult, null, 2)
    )
    if (!queryParamsResult.success) {
      throw new BadRequestException()
    }
    req.validatedQuery = queryParamsResult.data
  }

  // Validar cuerpo de la solicitud (si existe)
  if (
    schemas.body &&
    (req.method === "POST" || req.method === "PUT" || req.method === "PATCH")
  ) {
    let body
    try {
      body = await req.json()
    } catch (e) {
      body = undefined
    }
    console.log(`[VALIDATOR][BODY]:`, JSON.stringify(body, null, 2))
    const bodyResult = schemas.body.safeParse(body)
    console.log(`[VALIDATOR][BODY]:`, JSON.stringify(bodyResult, null, 2))
    if (!bodyResult.success) {
      throw new BadRequestException()
    }
    req.validatedBody = bodyResult.data
  }

  return await fn(req, ctx)
}
