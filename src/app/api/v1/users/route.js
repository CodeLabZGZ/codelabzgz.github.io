import { auth } from "@/auth"
import { getAll } from "@/functions/users/get-all"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

const getSchema = z
  .object({
    members: z.preprocess(val => val === "true", z.boolean()).optional(),
    participations: z.preprocess(val => val === "true", z.boolean()).optional(),
    scoreboards: z.preprocess(val => val === "true", z.boolean()).optional(),
    populate: z.preprocess(val => val === "true", z.boolean()).default(false),
    limit: z.preprocess(val => parseInt(val, 10), z.number().min(1)).optional(),
    offset: z.preprocess(val => parseInt(val, 10), z.number().min(0)).optional()
  })
  .refine(
    ({ members, participations, scoreboards }) => {
      // Check if (members or participations) are present with scoreboards -> error
      return !((members || participations) && scoreboards)
    },
    {
      message:
        "Cannot have 'members' and 'scoreboards' together, or 'participations' and 'scoreboards' together",
      path: ["members", "scoreboards", "participations"]
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
