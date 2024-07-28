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

async function postHandler(request, context) {
  const { eventId, challengeTitle } = context.params
  const formData = await request.formData()

  const source = formData.get("source")
  const buffer = Buffer.from(await source.arrayBuffer())
  const file = buffer.toString("utf-8")
  const languageId = Number(formData.get("language"))
  return handleSource(eventId, challengeTitle, file, languageId)
}

export const POST = errorHandler(postHandler)
