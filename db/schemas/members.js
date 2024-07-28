import { relations, sql } from "drizzle-orm"
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { teams } from "./teams.js"
import { users } from "./users.js"

export const members = sqliteTable(
  "members",
  {
    user: text("user").references(() => users.id, { onDelete: "cascade" }),
    team: text("team").references(() => teams.slug, { onDelete: "cascade" }),
    role: text("role", { enum: ["admin", "member", "pending"] }).notNull(),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
      sql`CURRENT_TIMESTAMP`
    )
  },
  m => ({
    compoundKey: primaryKey({ columns: [m.user, m.team] })
  })
)

export const membersRelations = relations(members, ({ one }) => ({
  team: one(teams, {
    fields: [members.team],
    references: [teams.slug]
  }),
  user: one(users, {
    fields: [members.user],
    references: [users.id]
  })
}))
