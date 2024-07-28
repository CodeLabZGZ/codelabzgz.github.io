import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { members } from "./members.js"
import { participations } from "./participations.js"
import { scoreboards } from "./scoreboards.js"

export const teams = sqliteTable("teams", {
  name: text("name").primaryKey(),
  motto: text("motto").notNull(),
  teamDescription: text("teamDescription"),
  slug: text("slug").unique(),
  logo: text("logo"),
  website: text("website"),
  websiteVisibility: text("websiteVisibility", { enum: ["public", "private"] })
    .notNull()
    .default("public"),
  twitter: text("twitter"),
  twitterVisibility: text("twitterVisibility", { enum: ["public", "private"] })
    .notNull()
    .default("public"),
  discord: text("discord"),
  discordVisibility: text("discordVisibility", { enum: ["public", "private"] })
    .notNull()
    .default("public"),
  email: text("email"),
  emailVisibility: text("emailVisibility", { enum: ["public", "private"] })
    .notNull()
    .default("public"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  )
})

// Schema for inserting a team - can be used to validate API requests
export const insertTeamSchema = createInsertSchema(teams)

// Schema for selecting a team - can be used to validate API responses
export const selectTeamSchema = createSelectSchema(teams)

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(members),
  participations: many(participations),
  scoreboards: many(scoreboards)
}))
