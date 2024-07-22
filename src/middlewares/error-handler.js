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
    console.log(error)

    return response({ statusCode: 500 })
  }
}
