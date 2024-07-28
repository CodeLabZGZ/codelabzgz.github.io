import { getOne } from "@/functions/users/get-one"
import { update } from "@/functions/users/update"
import { response } from "@/lib/utils"
import { authenticator } from "@/middlewares/authenticator"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { insertUserSchema } from "@/schema"
import { z } from "zod"

const pathSchema = z.object({
  id: z.string().uuid()
})

const getSchema = z
  .object({
    members: z.preprocess(val => val === "true", z.boolean()).optional(),
    participations: z.preprocess(val => val === "true", z.boolean()).optional(),
    scoreboards: z.preprocess(val => val === "true", z.boolean()).optional(),
    populate: z.preprocess(val => val === "true", z.boolean()).default(false)
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

async function updateHandler(request) {
  const { id } = request.validatedParams
  const values = request.validatedBody
  const data = await update({ id, values })
  return response({ data })
}

async function getHandler(request) {
  const { id } = request.validatedParams
  const params = request.validatedQuery
  const data = await getOne({ id, ...params })
  return response({ data })
}

export const PUT = errorHandler(
  authenticator(
    validator(updateHandler, { path: pathSchema, body: insertUserSchema })
  )
)
export const PATCH = errorHandler(
  authenticator(
    validator(updateHandler, {
      path: pathSchema,
      body: insertUserSchema.partial()
    })
  )
)
export const GET = errorHandler(
  authenticator(validator(getHandler, { path: pathSchema, query: getSchema }))
)
