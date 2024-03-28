import { challenges, events, members, teams, users } from "./schema.js"

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
  return Array.from(set).map(JSON.parse)
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
      startDate: dateA < dateB ? dateA : dateB,
      endDate: dateA < dateB ? dateB : dateA
    })
  }
  return values
}

function genChallenges ({ min = 0, max = 10, events }) {
  const values = []
  const difficultyLevels = [
    {
      difficulty: "very easy",
      points: 50
    }, {
      difficulty: "easy",
      points: 100
    }, {
      difficulty: "medium",
      points: 150
    }, {
      difficulty: "hard",
      points: 200
    }, {
      difficulty: "insane",
      points: 250
    }
  ]

  events.forEach(event => {
    const lim = Math.random() * (max - min) + min
    for (let index = 0; index < lim; index++) {
      const item = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)]
      values.push({
        event: event.id,
        title: faker.lorem.words({ min: 3, max: 8 }),
        description: faker.lorem.paragraphs({ min: 1, max: 4 }),
        difficulty: item.difficulty,
        points: item.points
      })
    }
  })

  return values
}

async function main () {
  const sqlite = new Database("db/sqlite.db")
  const db = drizzle(sqlite)

  const usersData = await db.insert(users).values(genUsers({ lim: 15 })).returning()
  const teamsData = await db.insert(teams).values(genTeams({ lim: 15 })).returning()
  const users4teams = await db.insert(members).values(genMembers({ lim: 30, users: usersData, teams: teamsData })).returning()

  const eventsData = await db.insert(events).values(genEvents({ lim: 15 })).returning()
  const challengesData = await db.insert(challenges).values(genChallenges({ max: 5, events: eventsData })).returning()

  console.log("users: %d", usersData.length)
  console.log("teams: %d", teamsData.length)
  console.log("members: %d", users4teams.length)

  console.log("events: %d", eventsData.length)
  console.log("challenges: %d", challengesData.length)
}

await main()
