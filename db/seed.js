import { challenges, events, members, participations, scoreboards, teams, users } from "./schema.js"

import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { faker } from "@faker-js/faker"
import shuffle from "just-shuffle"

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

function genMembers ({ min = 0, max = 5, users, teams }) {
  const values = []

  teams.forEach(team => {
    const lim = Math.random() * (max - min) + min
    const users4team = shuffle(users).slice(0, lim)
    users4team.forEach((user, index) => {
      values.push({
        team,
        user,
        role: index === 0
          ? "admin"
          : Math.random() > 0.75
            ? "pending"
            : "member"
      })
    })
  })

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
        event,
        title: faker.lorem.words({ min: 3, max: 8 }),
        description: faker.lorem.paragraphs({ min: 1, max: 4 }),
        difficulty: item.difficulty,
        points: item.points
      })
    }
  })

  return values
}

function genParticipations ({ min = 0, max = 10, members, events }) {
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

function genScoreboard ({ min = 0, max = 4, events, challenges, participations }) {
  const values = []

  participations.forEach(p => {
    const event = events.find(e => e.id === p.event)
    const problems = challenges.filter(c => c.event === p.event)

    problems.forEach(challenge => {
      const tries = Math.random() * (max - min) + min
      for (let index = 0; index < tries; index++) {
        values.push({
          event: p.event,
          challenge: challenge.title,
          user: p.user,
          team: p.team,
          timestamp: faker.date.between({ from: event.startDate, to: event.endDate }),
          points: String(Math.floor(Math.random() * 1e12) + 1)
        })
      }
    })
  })

  return values
}

async function main () {
  const sqlite = new Database("db/sqlite.db")
  const db = drizzle(sqlite)

  const usersData = await db.insert(users).values(genUsers({ lim: 15 })).returning()
  const teamsData = await db.insert(teams).values(genTeams({ lim: 15 })).returning()
  const users4teams = await db.insert(members).values(genMembers({ lim: 30, users: usersData.map(u => u.id), teams: teamsData.map(t => t.name) })).returning()

  const eventsData = await db.insert(events).values(genEvents({ lim: 15 })).returning()
  const challengesData = await db.insert(challenges).values(genChallenges({ max: 5, events: eventsData.map(e => e.id) })).returning()

  const participationsData = await db.insert(participations).values(genParticipations({ max: 7, members: users4teams, events: eventsData.map(e => e.id) })).returning()
  const scoreboardsData = await db.insert(scoreboards).values(genScoreboard({ events: eventsData, challenges: challengesData, participations: participationsData })).returning()

  console.log("users: %d", usersData.length)
  console.log("teams: %d", teamsData.length)
  console.log("members: %d", users4teams.length)
  console.log("events: %d", eventsData.length)
  console.log("challenges: %d", challengesData.length)
  console.log("participations: %d", participationsData.length)
  console.log("scoreboard: %d", scoreboardsData.length)
}

await main()
