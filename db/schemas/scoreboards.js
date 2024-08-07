import { relations, sql } from "drizzle-orm"
import {
  foreignKey,
  integer,
  primaryKey,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"
import { challenges } from "./challenges.js"
import { events } from "./events.js"
import { teams } from "./teams.js"
import { users } from "./users.js"

export const scoreboards = sqliteTable(
  "scoreboards",
  {
    event: text("event"),
    challenge: text("challenge"),
    user: text("user").references(() => users.id),
    team: text("team").references(() => teams.slug),
    timestamp: integer("timestamp", { mode: "timestamp_ms" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    points: integer("points", { mode: "number" })
  },
  sb => ({
    compoundKey: primaryKey({
      columns: [sb.event, sb.challenge, sb.user]
    }),
    challengeReference: foreignKey({
      columns: [sb.event, sb.challenge],
      foreignColumns: [challenges.event, challenges.title]
    })
  })
)

export const scoreboardsRelations = relations(scoreboards, ({ one }) => ({
  challenge: one(challenges, {
    fields: [scoreboards.event, scoreboards.challenge],
    references: [challenges.event, challenges.title]
  }),
  team: one(teams, {
    fields: [scoreboards.team],
    references: [teams.slug]
  }),
  event: one(events, {
    fields: [scoreboards.event],
    references: [events.slug]
  }),
  user: one(users, {
    fields: [scoreboards.user],
    references: [users.id]
  })
}))
