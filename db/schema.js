import { relations, sql } from "drizzle-orm"
import {
  foreignKey,
  integer,
  primaryKey,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  image: text("image"),
  name: text("name"),
  description: text("description"),
  status: text("status"),
  username: text("username"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  urls: text("urls", { mode: "json" }),
  socialEmails: integer("socialEmails", { mode: "boolean" }).default(0),
  marketingEmails: integer("marketingEmails", { mode: "boolean" }).default(0),
  securityEmails: integer("securityEmails", { mode: "boolean" }).default(0),
  privacyPolicy: integer("privacyPolicy", { mode: "boolean" }).default(1),
  imageRight: integer("imageRight", { mode: "boolean" }).default(0),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  )
})

export const usersRelations = relations(users, ({ many }) => ({
  members: many(members),
  participations: many(participations),
  scoreboards: many(scoreboards)
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
  account => ({
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
  vt => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
)

export const teams = sqliteTable("teams", {
  name: text("name").primaryKey(),
  motto: text("motto").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  website: text("website"),
  websiteVisibility: text("websiteVisibility", { enum: ["public", "private"] })
    .notNull()
    .default("public"),
  twitter: text("twitter"),
  twitterVisibility: text("twitterVisibility", { enum: ["public", "private"] })
    .notNull()
    .default("public"),
  discord: text("discord"),
  discordVisibility: text("discordVisibility", { enum: ["public", "private"] })
    .notNull()
    .default("public"),
  email: text("email"),
  emailVisibility: text("emailVisibility", { enum: ["public", "private"] })
    .notNull()
    .default("public"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  )
})

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(members),
  participations: many(participations),
  scoreboards: many(scoreboards)
}))

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
  participations: many(participations)
}))

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
  challenges: many(tests),
  scoreboards: many(scoreboards)
}))

export const members = sqliteTable(
  "members",
  {
    user: text("user").references(() => users.id, { onDelete: "cascade" }),
    team: text("team").references(() => teams.name, { onDelete: "cascade" }),
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
    references: [teams.name]
  }),
  user: one(users, {
    fields: [members.user],
    references: [users.id]
  })
}))

export const participations = sqliteTable(
  "participations",
  {
    user: text("user").references(() => users.id, { onDelete: "cascade" }),
    event: integer("event", { mode: "number" }).references(() => events.id, {
      onDelete: "cascade"
    }),
    team: text("team").references(() => teams.name)
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
    references: [teams.name]
  })
}))

export const scoreboards = sqliteTable(
  "scoreboards",
  {
    event: integer("event", { mode: "number" }),
    challenge: text("challenge"),
    user: text("user").references(() => users.id),
    team: text("team").references(() => teams.name),
    timestamp: integer("timestamp", { mode: "timestamp_ms" }),
    points: text("points")
  },
  sb => ({
    compoundKey: primaryKey({
      columns: [sb.event, sb.challenge, sb.user, sb.timestamp]
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
    references: [teams.name]
  }),
  user: one(users, {
    fields: [scoreboards.user],
    references: [users.id]
  })
}))

export const tests = sqliteTable(
  "tests",
  {
    id: integer("id", { mode: "number" }),
    event: integer("event", { mode: "number" }),
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
