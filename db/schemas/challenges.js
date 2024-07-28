import { relations } from "drizzle-orm"
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { events } from "./events.js"
import { scoreboards } from "./scoreboards.js"
import { tests } from "./tests.js"

export const challenges = sqliteTable(
  "challenges",
  {
    event: integer("event", { mode: "number" }).references(() => events.id, {
      onDelete: "cascade"
    }),
    title: text("title"),
    difficulty: text("difficulty", {
      enum: ["very easy", "easy", "medium", "hard", "insane"]
    }).notNull(),
    points: integer("points", { mode: "number" }),
    validator: text("validator")
  },
  c => ({
    compoundKey: primaryKey({ columns: [c.event, c.title] })
  })
)

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  event: one(events, {
    fields: [challenges.event],
    references: [events.id]
  }),
  tests: many(tests),
  scoreboards: many(scoreboards)
}))
