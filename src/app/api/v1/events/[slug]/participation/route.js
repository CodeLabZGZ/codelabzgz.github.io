import { auth } from "@/auth"
import { join, leave } from "@/functions/events/participation"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

const pathSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: "Slug can only contain letters, numbers, and hyphens as separators"
  })
})

const joinSchema = z
  .object({
    team: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
      message:
        "Slug can only contain letters, numbers, and hyphens as separators"
    })
  })
  .optional()

async function postHandler(request) {
  const { user } = request.auth
  const { slug } = request.validatedParams
  const team = request.validatedBody
  const values = { event: slug, user: user.id, ...team }
  const data = join({ values })
  return response({ data })
}

async function deleteHandler(request) {
  const { user } = request.auth
  const { slug } = request.validatedParams
  const values = { event: slug, user: user.id }
  const data = leave({ ...values })
  return response({ data })
}

export const POST = auth(
  errorHandler(validator(postHandler, { path: pathSchema, body: joinSchema }))
)

export const DELETE = auth(
  errorHandler(validator(deleteHandler, { path: pathSchema }))
)
