import { getScoreboard } from "@/functions/teams/get-scoreboard"
import { response } from "@/lib/utils"
import { authenticator } from "@/middlewares/authenticator"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

const getSchema = z.object({
  limit: z
    .preprocess(val => parseInt(val, 10), z.number().min(1).max(20))
    .default(10),
  offset: z.preprocess(val => parseInt(val, 10), z.number().min(0)).default(0)
})

async function getHandler(request) {
  const params = request.validatedQuery
  const data = await getScoreboard({ ...params })
  return response({ data })
}

export const GET = errorHandler(
  authenticator(validator(getHandler, { query: getSchema }))
)
