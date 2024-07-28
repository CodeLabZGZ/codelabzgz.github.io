import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { challenges } from "./challenges.js"
import { participations } from "./participations.js"
import { scoreboards } from "./scoreboards.js"

export const events = sqliteTable("events", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  banner: text("banner"),
  visibility: text("visibility", { enum: ["public", "private"] }).notNull(),
  format: text("type", { enum: ["hackathon", "ideathon"] }).notNull(),
  location: text("location").notNull(),
  startDate: integer("startDate", { mode: "timestamp_ms" }).notNull(),
  endDate: integer("endDate", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  )
})

export const eventsRelations = relations(events, ({ many }) => ({
  challenges: many(challenges),
  scoreboards: many(scoreboards),
  participations: many(participations)
}))
