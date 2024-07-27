import { db } from "@/db"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { challenges } from "@/schema"
import { and, eq } from "drizzle-orm"

async function handleTests(tokens) {
  const [tests] = await db
    .select()
    .from(tests)
    .where(and(eq(tests.event, eventId), eq(tests.title, challengeTitle)))

  const searchParams = new URLSearchParams({ tokens: tokens.join(",") })
  const results = await fetch(
    `${process.env.JUDGE0_API_URL}/submissions/batch?${searchParams}`
  ).then(res => res.json())

  return response({
    data: results,
    statusCode: 200
  })
}

async function handleCustom(validator, eventId, challengeTitle, content) {
  return fetch(validator, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: eventId,
      challenge: challengeTitle,
      content
    })
  })
    .then(async () => {
      return response({ statusCode: 200 })
    })
    .catch(() => {
      return response({ statusCode: 400 })
    })
}

async function postHandler(_request, context) {
  const { eventId, challengeTitle } = context.params

  const [challenge] = await db
    .select()
    .from(challenges)
    .where(
      and(eq(challenges.event, eventId), eq(challenges.title, challengeTitle))
    )

  if (challenge.validator) {
    const content = formData.get("content")
    return handleCustom(challenge.validator, eventId, challengeTitle, content)
  } else {
    const tokens = formData.get("tokens")
    return handleTests(tokens)
  }
}

export const POST = errorHandler(postHandler)
