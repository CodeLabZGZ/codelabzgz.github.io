import { db } from "@/db"
import { NotFoundException } from "@/lib/api-errors"
import { response } from "@/lib/utils"
import { errorHandler } from "@/middlewares/error-handler"
import { teams } from "@/schema"
import { eq } from "drizzle-orm"

/**
 * Update team data
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function putHandler(request, context) {
  const id = context.params.id
  const values = await request.json()
  const realValues = {
    ...values,
    website: values.website.value,
    websiteVisibility: values.website.visibility,
    discord: values.discord.value,
    discordVisibility: values.discord.visibility,
    twitter: values.twitter.value,
    twitterVisibility: values.twitter.visibility,
    email: values.email.value,
    emailVisibility: values.email.visibility
  }
  const data = await db
    .update(teams)
    .set(realValues)
    .where(eq(teams.name, id))
    .returning()
  if (data.length === 0) throw new NotFoundException()
  return response({ data })
}

/**
 * Update title and description of the team
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function patchHandler(request, context) {
  const id = context.params.id
  const { website, twitter, discord, email } = await request.json()

  const values = {
    ...(website && { websiteVisibility: website.visibility }),
    ...(twitter && { twitterVisibility: twitter.visibility }),
    ...(discord && { discordVisibility: discord.visibility }),
    ...(email && { emailVisibility: email.visibility })
  }

  const data = await db
    .update(teams)
    .set(values)
    .where(eq(teams.name, id))
    .returning()

  if (data.length === 0) throw new NotFoundException()
  return response({ data })
}

/**
 * Find a team by name and return its information.
 * The response will contain:
 * - the team information
 * - The members list, where some additional info is included:
 *    - The number of events where each member participates in
 *    - The amount of points in total
 *
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function getHandler(request, context) {
  const id = context.params.id
  const data = await db.query.teams.findFirst({
    where: eq(teams.name, id)
  })

  if (!data) throw new NotFoundException()
  return response({ data })
}

/**
 * Delete a team and all its information
 * @param {*} request
 * @param {*} context
 * @returns
 */
async function deleteHandler(request, context) {
  const id = context.params.id
  const rows = await db.delete(teams).where(eq(teams.name, id)).returning()

  if (rows.length === 0) throw new NotFoundException()
  return response({ code: 200, statusCode: 204 })
}

export const PUT = errorHandler(putHandler)
export const PATCH = errorHandler(patchHandler)
export const GET = errorHandler(getHandler)
export const DELETE = errorHandler(deleteHandler)
