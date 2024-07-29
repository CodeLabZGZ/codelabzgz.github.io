import { relations } from "drizzle-orm"
import {
  foreignKey,
  integer,
  primaryKey,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"
import { challenges } from "./challenges.js"

export const tests = sqliteTable(
  "tests",
  {
    id: integer("id", { mode: "number" }),
    event: text("event"),
    challenge: text("challenge"),
    input: text("input", { mode: "json" }),
    output: text("output")
  },
  sb => ({
    compoundKey: primaryKey({
      columns: [sb.id, sb.event, sb.challenge]
    }),
    challengeReference: foreignKey({
      columns: [sb.event, sb.challenge],
      foreignColumns: [challenges.event, challenges.title]
    })
  })
)

export const testsRelations = relations(tests, ({ one }) => ({
  challenge: one(challenges, {
    fields: [tests.event, tests.challenge],
    references: [challenges.event, challenges.title]
  })
}))
