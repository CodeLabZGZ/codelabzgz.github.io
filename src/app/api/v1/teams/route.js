import { getAll } from "@/functions/teams/get-all"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

// async function postHandler(request) {
//   const values = request.json()

//   const data = await db.insert(teams).values(values).returning()

//   return response({ data, statusCode: 201 })
// }

const getSchema = z
  .object({
    members: z.preprocess(val => val === "true", z.boolean()).optional(),
    participations: z.preprocess(val => val === "true", z.boolean()).optional(),
    scoreboards: z.preprocess(val => val === "true", z.boolean()).optional(),
    populate: z.preprocess(val => val === "true", z.boolean()).default(false),
    limit: z
      .preprocess(val => parseInt(val, 10), z.number().min(1).max(20))
      .default(10),
    offset: z.preprocess(val => parseInt(val, 10), z.number().min(0)).default(0)
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

// export const POST = errorHandler(postHandler)
export const GET = errorHandler(validator(getHandler, { query: getSchema }))
