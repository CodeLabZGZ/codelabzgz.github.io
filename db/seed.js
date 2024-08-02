import "dotenv/config"

import { faker } from "@faker-js/faker"
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import shuffle from "just-shuffle"
import { challenges } from "./schemas/challenges.js"
import { events } from "./schemas/events.js"
import { members } from "./schemas/members.js"
import { participations } from "./schemas/participations.js"
import { scoreboards } from "./schemas/scoreboards.js"
import { teams } from "./schemas/teams.js"
import { tests } from "./schemas/tests.js"
import { users } from "./schemas/users.js"

function genUsers() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email()
  }
}

function genTeams() {
  return {
    name: faker.company.name(),
    motto: faker.lorem.sentence(),
    slug: faker.lorem.slug()
  }
}

function genMembers({ min = 0, max = 5, users, teams }) {
  const values = []

  teams.forEach(team => {
    const lim = Math.random() * (max - min) + min
    const users4team = shuffle(users).slice(0, lim)
    users4team.forEach((user, index) => {
      values.push({
        team,
        user,
        role:
          index === 0 ? "admin" : Math.random() > 0.75 ? "pending" : "member"
      })
    })
  })

  return values
}

function genEvents() {
  const dateA = faker.date.anytime()
  const dateB = faker.date.anytime()

  const title = faker.lorem.words({ min: 3, max: 8 })

  return {
    slug: title.replaceAll(" ", "-").toLowerCase(),
    title,
    visibility: faker.helpers.arrayElement(["public", "private"]),
    format: faker.helpers.arrayElement(["hackathon", "ideathon"]),
    location: faker.location.direction(),
    startDate: dateA < dateB ? dateA : dateB,
    endDate: dateA < dateB ? dateB : dateA
  }
}

function genChallenges({ min = 0, max = 10, events }) {
  const values = []
  const difficultyLevels = [
    {
      difficulty: "very easy",
      points: 15
    },
    {
      difficulty: "easy",
      points: 20
    },
    {
      difficulty: "medium",
      points: 30
    },
    {
      difficulty: "hard",
      points: 40
    },
    {
      difficulty: "insane",
      points: 50
    }
  ]

  events.forEach(event => {
    const lim = Math.random() * (max - min) + min
    for (let index = 0; index < lim; index++) {
      const item =
        difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)]
      values.push({
        event,
        title: faker.lorem.words({ min: 3, max: 8 }),
        difficulty: item.difficulty,
        points: item.points
      })
    }
  })

  return values
}

function genParticipations({ min = 0, max = 10, members, events }) {
  const values = []

  events.forEach(event => {
    const lim = Math.random() * (max - min) + min
    const guests = shuffle(members).slice(0, lim)
    const people = []
    guests.forEach(({ user, team }) => {
      if (!people.includes(user)) {
        values.push({ event, user, team })
        people.push(user)
      }
    })
  })

  return values
}

function genScoreboard({ events, challenges, participations }) {
  const values = []

  participations.forEach(p => {
    const event = events.find(e => e.slug === p.event)
    const problems = challenges.filter(c => c.event === p.event)

    problems.forEach(challenge => {
      values.push({
        event: p.event,
        challenge: challenge.title,
        user: p.user,
        team: p.team,
        timestamp: faker.date.between({
          from: event.startDate,
          to: event.endDate
        }),
        points: String(Math.floor(Math.random() * 1e12) + 1)
      })
    })
  })

  return values
}

function genTest(challengesData) {
  return challengesData
    .map(({ title, event }) => {
      // Generar una cantidad aleatoria de números en el rango de 1 a 7
      const numTests = faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7])
      const nums = [...Array(numTests).keys()]

      // Crear la lista de objetos de prueba
      const listOfNums = nums.map((_, id) => {
        const a = faker.number.int()
        const b = faker.number.int()
        return {
          id,
          challenge: title,
          event,
          input: [String(a), String(b)],
          output: String(a + b)
        }
      })

      return listOfNums
    })
    .flat()
}

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL
  })
  const db = drizzle(client)

  const usersData = await db
    .insert(users)
    .values(faker.helpers.multiple(genUsers, { count: 15 }))
    .returning()
  const teamsData = await db
    .insert(teams)
    .values(faker.helpers.multiple(genTeams, { count: 10 }))
    .returning()
  const users4teams = await db
    .insert(members)
    .values(
      genMembers({
        lim: 30,
        users: usersData.map(u => u.id),
        teams: teamsData.map(t => t.slug)
      })
    )
    .returning()

  const eventsData = await db
    .insert(events)
    .values(faker.helpers.multiple(genEvents, { count: 15 }))
    .returning()
  const challengesData = await db
    .insert(challenges)
    .values(genChallenges({ max: 5, events: eventsData.map(e => e.slug) }))
    .returning()

  const participationsData = await db
    .insert(participations)
    .values(
      genParticipations({
        max: 7,
        members: users4teams,
        events: eventsData.map(e => e.slug)
      })
    )
    .returning()
  const scoreboardsData = await db
    .insert(scoreboards)
    .values(
      genScoreboard({
        events: eventsData,
        challenges: challengesData,
        participations: participationsData
      })
    )
    .returning()

  const testsData = await db
    .insert(tests)
    .values(genTest(challengesData))
    .returning()

  console.log("users: %d", usersData.length)
  console.log("teams: %d", teamsData.length)
  console.log("members: %d", users4teams.length)
  console.log("events: %d", eventsData.length)
  console.log("challenges: %d", challengesData.length)
  console.log("participations: %d", participationsData.length)
  console.log("scoreboard: %d", scoreboardsData.length)
  console.log("tests: %d", testsData.length)
}

await main()
