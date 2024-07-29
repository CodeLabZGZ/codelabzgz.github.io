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

async function getHandler(request) {
  const { id } = request.validatedParams
  const data = await getScoreboard({ id })
  return response({ data })
}

export const GET = errorHandler(
  authenticator(validator(getHandler, { path: pathSchema }))
)
