import { sendVerificationRequest } from "@/lib/send-verification-request"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"

async function POSTHandler(request) {
  const params = await request.json()
  await sendVerificationRequest(params)
  return response({ data: [] })
}

export const POST = errorHandler(POSTHandler)
