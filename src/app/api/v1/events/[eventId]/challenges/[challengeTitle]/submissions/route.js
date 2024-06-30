import { db } from "@/db"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { tests } from "@/schema"
import { and, eq } from "drizzle-orm"

async function handleSource(eventId, challengeTitle, sourceCode, languageId) {
  const cases = await db
    .select()
    .from(tests)
    .where(and(eq(tests.event, eventId), eq(tests.challenge, challengeTitle)))

  const tokens = await fetch(
    `${process.env.JUDGE0_API_URL}/submissions/batch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        submissions: cases.map(c => ({
          source_code: sourceCode,
          language_id: languageId,
          command_line_arguments: c.input.join(" ")
        }))
      })
    }
  ).then(res => res.json())

  return response({
    data: tokens.map(({ token }, id) => ({
      id: cases[id].id,
      token
    })),
    statusCode: 200
  })
}

async function handleSolution(file) {
  response({ statusCode: 200 })
}

async function postHandler(request, context) {
  const { eventId, challengeTitle } = context.params
  const formData = await request.formData()

  const source = formData.get("source")
  const solution = formData.get("solution")
  if (source) {
    const buffer = Buffer.from(await source.arrayBuffer())
    const file = buffer.toString("utf-8")
    const languageId = Number(formData.get("language"))
    return handleSource(eventId, challengeTitle, file, languageId)
  } else if (solution) {
    const buffer = Buffer.from(await solution.arrayBuffer())
    const file = buffer.toString("utf-8")
    return handleSolution(file)
  } else {
    return response({ statusCode: 400 })
  }
}

async function getHandler(request, context) {
  const { eventId, challengeTitle } = context.params
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.searchParams)

  const cases = await db
    .select()
    .from(tests)
    .where(and(eq(tests.event, eventId), eq(tests.challenge, challengeTitle)))

  const results = await fetch(
    `${process.env.JUDGE0_API_URL}/submissions/batch?${searchParams}`
  ).then(res => res.json())

  return response({
    data: results,
    statusCode: 200
  })
}

export const GET = errorHandler(getHandler)
export const POST = errorHandler(postHandler)
