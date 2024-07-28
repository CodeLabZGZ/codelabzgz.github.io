import { getScoreboard } from "@/functions/events/get-scoreboard"
import { response } from "@/lib/utils"
import { authenticator } from "@/middlewares/authenticator"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

const pathSchema = z.object({
  id: z
    .string()
    .refine(
      value => {
        const number = parseInt(value, 10)
        return Number.isInteger(number) && number > 0 && number <= 1000000
      },
      {
        message: "ID must be a positive integer within a safe range"
      }
    )
    .transform(value => parseInt(value, 10))
})

const getSchema = z.object({
  limit: z
    .preprocess(val => parseInt(val, 10), z.number().min(1).max(20))
    .default(10),
  offset: z.preprocess(val => parseInt(val, 10), z.number().min(0)).default(0)
})

async function getHandler(request) {
  const { id } = request.validatedParams
  const params = request.validatedQuery
  const data = await getScoreboard({ id, ...params })
  return response({ data })
}

export const GET = errorHandler(
  authenticator(validator(getHandler, { path: pathSchema, query: getSchema }))
)
