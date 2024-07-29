import { getScoreboard } from "@/functions/teams/get-scoreboard"
import { response } from "@/lib/utils"
import { authenticator } from "@/middlewares/authenticator"
import { errorHandler } from "@/middlewares/error-handler"

async function getHandler() {
  const data = await getScoreboard()
  return response({ data })
}

export const GET = errorHandler(authenticator(getHandler))
