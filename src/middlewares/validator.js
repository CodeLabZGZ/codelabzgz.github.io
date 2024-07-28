import { BadRequestException } from "@/lib/api-errors"

export const validator = (fn, schemas) => async (req, res) => {
  // Validar encabezados
  if (schemas.headers) {
    const headers = Object.fromEntries(req.headers.entries())
    const headersResult = schemas.headers.safeParse(headers)
    if (!headersResult.success) {
      throw new BadRequestException()
    }
    req.validatedHeaders = headersResult.data
  }

  // Validar parámetros de ruta (si existen)
  if (schemas.routeParams) {
    const url = new URL(req.nextUrl, `http://${req.headers.host}`)
    const routeParams = { userId: url.pathname.split("/").pop() }
    const routeParamsResult = schemas.routeParams.safeParse(routeParams)
    if (!routeParamsResult.success) {
      throw new BadRequestException()
    }
    req.validatedParams = routeParamsResult.data
  }

  // Validar query params
  if (schemas.query) {
    const url = new URL(req.nextUrl, `http://${req.headers.host}`)
    const queryParams = Object.fromEntries(url.searchParams.entries())
    const queryParamsResult = schemas.query.safeParse(queryParams)
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
    const body = await req.json()
    const bodyResult = schemas.body.safeParse(body)
    if (!bodyResult.success) {
      throw new BadRequestException()
    }
    req.validatedBody = bodyResult.data
  }

  return await fn(req, res)
}
