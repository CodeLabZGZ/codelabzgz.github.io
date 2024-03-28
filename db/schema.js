import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  image: text("image"),
  name: text("name"),
  username: text("username"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  created: integer("created", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`),
  updated: integer("updated", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`)
})

export const usersRelations = relations(users, ({ many }) => ({
  members: many(members)
}))

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
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
)

export const teams = sqliteTable("teams", {
  name: text("name").primaryKey(),
  motto: text("motto").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  created: integer("created", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`),
  updated: integer("updated", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`)
})

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(members)
}))

export const events = sqliteTable("events", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
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

export const eventsRelations = relations(events, ({ many }) => ({
  challenges: many(challenges)
}))

export const challenges = sqliteTable("challenges", {
  event: integer("event", { mode: "number" }).notNull(),
  title: text("title"),
  description: text("description").notNull(),
  difficulty: text("difficulty", { enum: ["very easy", "easy", "medium", "hard", "insane"] }).notNull(),
  points: integer("points", { mode: "number" })
}, (c) => ({
  compoundKey: primaryKey({ columns: [c.event, c.title] })
}))

export const challengesRelations = relations(challenges, ({ one }) => ({
  event: one(events, {
    fields: challenges.event,
    references: events.id
  })
}))

export const members = sqliteTable("members", {
  user: text("user"),
  team: text("name"),
  role: text("role", { enum: ["admin", "member"] }).notNull()
}, (m) => ({
  compoundKey: primaryKey({ columns: [m.user, m.team] })
}))

export const membersRelations = relations(members, ({ one }) => ({
  team: one(teams, {
    fields: [members.team],
    references: [teams.name]
  }),
  user: one(users, {
    fields: [members.user],
    references: [users.id]
  })
}))
