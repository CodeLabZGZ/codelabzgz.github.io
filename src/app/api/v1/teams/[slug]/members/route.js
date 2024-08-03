import { updateMembers } from "@/functions/teams/update"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

const pathSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: "Slug can only contain letters, numbers, and hyphens as separators"
  })
})

const patchSchema = z.object({
  user: z.string().uuid(),
  role: z.enum(["admin", "member", "pending"]).optional()
})

async function updateHandler(request) {
  const { slug } = request.validatedParams
  const values = request.validatedBody
  const data = await updateMembers({ slug, values })
  return response({ data })
}

export const PATCH = errorHandler(
  validator(updateHandler, {
    path: pathSchema,
    body: patchSchema.partial()
  })
)
