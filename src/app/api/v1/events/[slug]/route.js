import { auth } from "@/auth"
import { getOne } from "@/functions/events/get-one"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

const pathSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: "Slug can only contain letters, numbers, and hyphens as separators"
  })
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
      // Check if (challenges or participations) are present with scoreboards -> error
      return !((challenges || participations) && scoreboards)
    },
    {
      message:
        "Cannot have 'challenges', 'scoreboards', 'participations' together, you must pick one of them",
      path: ["challenges", "scoreboards", "participations"]
    }
  )

async function getHandler(request) {
  const { slug } = request.validatedParams
  const params = request.validatedQuery
  const data = await getOne({ slug, ...params })
  return response({ data })
}

export const GET = auth(
  errorHandler(validator(getHandler, { path: pathSchema, query: getSchema }))
)
