import { HTTPException } from "@/lib/api-errors"
import { response } from "@/lib/utils"

export const errorHandler = fn => async (req, res) => {
  try {
    return await fn(req, res)
  } catch (error) {
    if (error instanceof HTTPException) {
      return response({
        code: error.statusCode,
        message: error.message,
        statusCode: error.statusCode
      })
    }

    return response({ statusCode: 500, message: error.message })
  }
}
