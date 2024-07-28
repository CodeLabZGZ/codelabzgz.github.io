import { auth } from "@/auth"
import { UnauthorizedException } from "@/lib/api-errors"

export const authenticator = fn => async (req, res) => {
  const session = await auth()
  if (session) return await fn(req, res)

  // TODO: validate token
  const authorization = new Headers(req.headers)
    .get("authorization")
    .split(" ")
    .pop()
  if (authorization) return await fn(req, res)

  throw new UnauthorizedException()
}
