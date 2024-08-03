import { auth } from "@/auth"
import { getAll } from "@/functions/teams/get-all"
import { insert } from "@/functions/teams/insert"
import { insert as update } from "@/functions/teams/update"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { insertTeamSchema } from "@/schemas"
import { z } from "zod"

async function postHandler(request) {
  const { id } = request.auth.user
  const values = request.validatedBody
  const data = await insert({ id, values })

  return response({ data, statusCode: 201 })
}

const updateSchema = z.object({
  team: z.string()
})

async function updateHandler(request) {
  const { id } = request.auth.user
  const { team } = request.validatedBody
  const data = await update({
    values: { user: id, team, role: "pending" }
  })

  return response({ data })
}

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

export const POST = auth(
  errorHandler(validator(postHandler, { body: insertTeamSchema }))
)
export const PUT = auth(
  errorHandler(validator(updateHandler, { body: updateSchema }))
)
export const GET = errorHandler(validator(getHandler, { query: getSchema }))
