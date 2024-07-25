import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { users } from "@/schema"
import { eq } from "drizzle-orm"

async function putHandler(request, context) {
  const id = context.params.id
  const values = await request.json()

  const data = await db
    .update(users)
    .set(values)
    .where(eq(users.id, id))
    .returning()

  if (data.length === 0) throw new NotFoundException()
  return response({ data })
}

async function patchHandler(request, context) {
  const id = context.params.id
  const {
    image,
    name,
    description,
    username,
    email,
    emailVerified,
    urls,
    socialEmails,
    marketingEmails,
    securityEmails,
    privacyPolicy,
    imageRight
  } = await request.json()

  const values = {
    ...(image !== undefined && { image }),
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(username !== undefined && { username }),
    ...(email !== undefined && { email }),
    ...(emailVerified !== undefined && { emailVerified }),
    ...(urls !== undefined && { urls }),
    ...(socialEmails !== undefined && { socialEmails }),
    ...(marketingEmails !== undefined && { marketingEmails }),
    ...(securityEmails !== undefined && { securityEmails }),
    ...(privacyPolicy !== undefined && { privacyPolicy }),
    ...(imageRight !== undefined && { imageRight })
  }

  console.log(values)

  const data = await db
    .update(users)
    .set(values)
    .where(eq(users.id, id))
    .returning()

  if (data.length === 0) throw new NotFoundException()
  return response({ data })
}

async function getHandler(request, context) {
  const id = context.params.id
  const data = await db.query.users.findFirst({
    where: eq(users.id, id)
  })

  if (!data) throw new NotFoundException()
  return response({ data })
}

export const PUT = errorHandler(putHandler)
export const PATCH = errorHandler(patchHandler)
export const GET = errorHandler(getHandler)
