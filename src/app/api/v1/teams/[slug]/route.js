import { getOne } from "@/functions/teams/get-one"
import { update } from "@/functions/teams/update"
import { response } from "@/lib/utils"
import { authenticator } from "@/middlewares/authenticator"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { insertTeamSchema } from "@/schema"
import { z } from "zod"

const pathSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: "Slug can only contain letters, numbers, and hyphens as separators"
  })
})

async function updateHandler(request) {
  const { slug } = request.validatedParams
  const values = request.validatedBody
  const data = await update({ slug, values })
  return response({ data })
}

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
  const { slug } = request.validatedParams
  const params = request.validatedQuery
  const data = await getOne({ slug, ...params })
  return response({ data })
}

export const PUT = errorHandler(
  authenticator(
    validator(updateHandler, { path: pathSchema, body: insertTeamSchema })
  )
)
export const PATCH = errorHandler(
  authenticator(
    validator(updateHandler, {
      path: pathSchema,
      body: insertTeamSchema.partial()
    })
  )
)
export const GET = errorHandler(
  authenticator(validator(getHandler, { path: pathSchema, query: getSchema }))
)
