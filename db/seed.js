import { events, members, teams, users } from "./schema.js"

import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { faker } from "@faker-js/faker"

function genUsers ({ lim = 10 }) {
  const values = []
  for (let index = 0; index < lim; index++) {
    values.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email()
    })
  }
  return values
}

function genTeams ({ lim = 10 }) {
  const values = []
  for (let index = 0; index < lim; index++) {
    values.push({
      name: faker.company.name(),
      motto: faker.lorem.sentence(),
      slug: faker.lorem.slug()
    })
  }
  return values
}

function genEvents ({ lim = 10 }) {
  const values = []
  for (let index = 0; index < lim; index++) {
    const dateA = faker.date.anytime()
    const dateB = faker.date.anytime()

    values.push({
      title: faker.lorem.words({ min: 3, max: 8 }),
      visibility: Math.random() > 0.5 ? "public" : "private",
      format: Math.random() > 0.5 ? "hackathon" : "ideathon",
      location: faker.location.direction(),
      start_date: dateA < dateB ? dateA : dateB,
      end_date: dateA < dateB ? dateB : dateA
    })
  }
  return values
}

function genMembers ({ lim = 10, users, teams }) {
  const values = []
  for (let index = 0; index < lim; index++) {
    values.push({
      user: users[Math.floor(Math.random() * users.length)].id,
      team: teams[Math.floor(Math.random() * teams.length)].name,
      role: "member"
    })
  }

  const teamLeaders = {}
  values.forEach(({ user, team }, i) => {
    if (!teamLeaders[team]) {
      teamLeaders[team] = user
      values[i].role = "admin"
    }
  })

  const set = new Set(values.map(JSON.stringify))
  const arr = Array.from(set).map(JSON.parse)
  return arr
}

async function main () {
  const sqlite = new Database("db/sqlite.db")
  const db = drizzle(sqlite)

  const usersData = await db.insert(users).values(genUsers({ lim: 15 })).returning()
  const teamsData = await db.insert(teams).values(genTeams({ lim: 15 })).returning()
  const users4teams = await db.insert(members).values(genMembers({ lim: 30, users: usersData, teams: teamsData })).returning()

  const eventsData = await db.insert(events).values(genEvents({ lim: 15 })).returning()

  console.log("users: %d", usersData.length)
  console.log("teams: %d", teamsData.length)
  console.log("events: %d", eventsData.length)
  console.log("members: %d", users4teams.length)
}

await main()
