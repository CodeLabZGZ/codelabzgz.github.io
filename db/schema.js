import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"

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

export const teams = sqliteTable("teams", {
  logo: text("logo"),
  name: text("name").primaryKey(),
  motto: text("motto").notNull(),
  slug: text("slug").unique(),
  created: integer("created", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`),
  updated: integer("updated", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`)
})

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

export const challenges = sqliteTable("challenges", {
  title: text("title").primaryKey(),
  description: text("description").notNull(),
  difficulty: text("type", { enum: ["very easy", "easy", "medium", "hard", "insane"] }).notNull(),
  points: integer("points", { mode: "number" }),
  eventId: integer("id", { mode: "number" }).notNull()
})

// Represents to which teams each user belongs
export const members = sqliteTable("members", {
  userId: text("userId").notNull().references(() => users.id),
  team: text("team").notNull().references(() => teams.name),
  role: text("role", { enum: ["admin", "member"] }).notNull()
}, (m) => ({
  compoundKey: primaryKey({
    columns: [m.userId, m.team],
    onDelete: "cascade"
  })
}))

// Represents the participation of users in the different events with a given team.
export const participations = sqliteTable("participations", {
  userId: text("userId").notNull(),
  eventId: integer("id", { mode: "number" }).notNull(),
  team: text("team")
}, (p) => ({
  compoundKey: primaryKey({
    columns: [p.userId, p.eventId]
  })
}))

// Represents the points that the teams have for each of the challenges of the problem posed
export const scoreboards = sqliteTable("scoreboards", {
  eventId: integer("id", { mode: "number" }).references(() => events.id),
  challenge: text("challenge").references(() => challenges.title),
  team: text("team").references(() => teams.name),
  points: text("points")
}, (sb) => ({
  compoundKey: primaryKey({
    columns: [sb.eventId, sb.challenge, sb.team]
  })
}))

export const usersRelations = relations(users, ({ many }) => ({
  participations: many(participations),
  teams: many(members)
}))

export const teamsRelations = relations(teams, ({ many }) => ({
  participations: many(participations),
  users: many(members)
}))

export const eventsRelations = relations(events, ({ many }) => ({
  challenges: many(challenges),
  participations: many(participations)
}))

export const challengesRelations = relations(challenges, ({ one }) => ({
  event: one(events, {
    fields: [challenges.eventId],
    references: [events.id],
    onDelete: "cascade"
  })
}))

export const participationsRelations = relations(participations, ({ one }) => ({
  users: one(users, {
    fields: [participations.userId],
    references: [users.id]
  }),
  team: one(teams, {
    fields: [participations.team],
    references: [teams.name]
  }),
  event: one(events, {
    fields: [participations.eventId],
    references: [events.id]
  })
}))

export const membersRelations = relations(members, ({ one }) => ({
  users: one(users, {
    fields: [members.userId],
    references: [users.id]
  }),
  team: one(teams, {
    fields: [members.team],
    references: [teams.name]
  })
}))

export const scoreboardsRelations = relations(scoreboards, ({ one }) => ({
  challenges: one(challenges, {
    fields: [scoreboards.eventId, scoreboards.challenge],
    references: [challenges.eventId, challenges.title]
  }),
  team: one(teams, {
    fields: [scoreboards.team],
    references: [teams.name]
  })
}))
