import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { sql } from "drizzle-orm"

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  image: text("image"),
  name: text("name"),
  username: text("username"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  created: integer("created", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`),
  updated: integer("updated", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`)
})

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
)

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
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
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
)

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  banner: text("banner"),
  visibility: text("visibility", { enum: ["public", "private"] }).notNull(),
  format: text("type", { enum: ["hackathon", "ideathon"] }).notNull(),
  location: text("location").notNull(),
  start_date: integer("start_date", { mode: "timestamp_ms" }).notNull(),
  end_date: integer("end_date", { mode: "timestamp_ms" }).notNull(),
  created: integer("created", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`),
  updated: integer("updated", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`)
})

export const teams = sqliteTable("teams", {
  id: text("id").primaryKey(),
  logo: text("logo"),
  name: text("name").notNull(),
  motto: text("motto").notNull(),
  slug: text("slug").unique().notNull(),
  created: integer("created", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`),
  updated: integer("updated", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`)
})

export const visitors = sqliteTable("events", {
  id: text("id"),
  created: integer("created", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`),
  updated: integer("updated", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`)
})
