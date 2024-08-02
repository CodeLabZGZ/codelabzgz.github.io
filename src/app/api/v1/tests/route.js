import { response } from "@/lib/utils"
import { auth } from "@/auth"

async function getHandler(request, ctx) {
  return response({ data: { request, ctx } })
}

export const GET = auth(getHandler)
