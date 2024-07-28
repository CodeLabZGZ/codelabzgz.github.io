import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { users } from "./users.js"

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull()
})

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull()
  },
  vt => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
)
