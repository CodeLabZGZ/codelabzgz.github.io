import { auth } from "@/auth"
import { getAll } from "@/functions/events/get-all"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

const getSchema = z
  .object({
    challenges: z.preprocess(val => val === "true", z.boolean()).optional(),
    participations: z.preprocess(val => val === "true", z.boolean()).optional(),
    scoreboards: z.preprocess(val => val === "true", z.boolean()).optional(),
    populate: z.preprocess(val => val === "true", z.boolean()).default(false),
    limit: z.preprocess(val => parseInt(val, 10), z.number().min(1)).optional(),
    offset: z.preprocess(val => parseInt(val, 10), z.number().min(0)).optional()
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
  const params = request.validatedQuery
  const data = await getAll({ ...params })
  return response({ data })
}

export const GET = auth(
  errorHandler(validator(getHandler, { query: getSchema }))
)
