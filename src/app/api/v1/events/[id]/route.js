import { getOne } from "@/functions/events/get-one"
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

const getSchema = z
  .object({
    challenges: z.preprocess(val => val === "true", z.boolean()).optional(),
    participations: z.preprocess(val => val === "true", z.boolean()).optional(),
    scoreboards: z.preprocess(val => val === "true", z.boolean()).optional(),
    populate: z.preprocess(val => val === "true", z.boolean()).default(false)
  })
  .refine(
    ({ challenges, participations, scoreboards }) => {
      // Check if (challenges or participations or scoreboards) are present together -> error
      const xor = (challenges ?? 0) + (participations ?? 0) + (scoreboards ?? 0)
      if (xor <= 1) return true
    },
    {
      message:
        "Cannot have 'challenges', 'scoreboards', 'participations' together, you must pick one of them",
      path: ["challenges", "scoreboards", "participations"]
    }
  )

async function getHandler(request) {
  const { id } = request.validatedParams
  const params = request.validatedQuery
  const data = await getOne({ id, ...params })
  return response({ data })
}

export const GET = errorHandler(
  authenticator(validator(getHandler, { path: pathSchema, query: getSchema }))
)
