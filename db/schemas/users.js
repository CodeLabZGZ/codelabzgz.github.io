import { relations, sql } from "drizzle-orm"
import { members } from "./members.js"
import { participations } from "./participations.js"
import { scoreboards } from "./scoreboards.js"

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  image: text("image"),
  name: text("name"),
  description: text("description"),
  status: text("status"),
  username: text("username"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  urls: text("urls", { mode: "json" }),
  socialEmails: integer("socialEmails", { mode: "boolean" }).default(0),
  marketingEmails: integer("marketingEmails", { mode: "boolean" }).default(0),
  securityEmails: integer("securityEmails", { mode: "boolean" }).default(0),
  privacyPolicy: integer("privacyPolicy", { mode: "boolean" }).default(1),
  imageRight: integer("imageRight", { mode: "boolean" }).default(0),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  )
})

export const usersRelations = relations(users, ({ many }) => ({
  members: many(members),
  participations: many(participations),
  scoreboards: many(scoreboards)
}))
