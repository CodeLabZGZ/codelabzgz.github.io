import { auth } from "@/auth"
import { getScoreboard } from "@/functions/events/get-scoreboard"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { validator } from "@/middlewares/validator"
import { z } from "zod"

const pathSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: "Slug can only contain letters, numbers, and hyphens as separators"
  })
})

async function getHandler(request) {
  const { slug } = request.validatedParams
  const data = await getScoreboard({ slug })
  return response({ data })
}

export const GET = auth(
  errorHandler(validator(getHandler, { path: pathSchema }))
)
