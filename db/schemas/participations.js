import { relations } from "drizzle-orm"
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { events } from "./events.js"
import { teams } from "./teams.js"
import { users } from "./users.js"

export const participations = sqliteTable(
  "participations",
  {
    user: text("user").references(() => users.id, { onDelete: "cascade" }),
    event: integer("event", { mode: "number" }).references(() => events.id, {
      onDelete: "cascade"
    }),
    team: text("team").references(() => teams.slug)
  },
  p => ({
    compoundKey: primaryKey({ columns: [p.user, p.event] })
  })
)

export const participationsRelations = relations(participations, ({ one }) => ({
  user: one(users, {
    fields: [participations.user],
    references: [users.id]
  }),
  event: one(events, {
    fields: [participations.event],
    references: [events.id]
  }),
  team: one(teams, {
    fields: [participations.team],
    references: [teams.slug]
  })
}))
