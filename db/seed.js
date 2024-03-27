import { challenges, events, members, participations, scoreboards, teams, users } from "./schema"

import { db } from "db"
import { faker } from "@faker-js/faker"

function genUsers (lim = 5) {
  const values = []
  for (let index = 0; index < lim; index++) {
    values.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      emailVerified: faker.datatype.boolean()
    })
  }
  return values
}

function genTeams (lim = 5) {
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

function genEvents (lim = 5) {
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

function genChallenges (lim = 5, events) {
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

  for (let index = 0; index < lim; index++) {
    const item = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)]
    values.push({
      title: faker.lorem.words({ min: 3, max: 8 }),
      description: faker.lorem.sentences(3),
      difficulty: item.difficulty,
      points: item.points,
      eventId: events[Math.floor(Math.random() * events.length)].id
    })
  }
  return values
}

function genMembers (lim = 5, users, teams) {
  const values = []
  for (let index = 0; index < lim; index++) {
    const user = users[Math.floor(Math.random() * users.length)]
    values.push({
      userId: user.id,
      team: teams[Math.floor(Math.random() * teams.length)].name,
      role: users[0].id === user.id ? "admin" : "member"
    })
  }
  return values
}

function getParticipations (lim = 5, members, events) {
  const values = []
  for (let index = 0; index < lim; index++) {
    values.push({
      eventId: events[Math.floor(Math.random() * events.length)].id,
      userId: members[Math.floor(Math.random() * members.length)].userId,
      team: members[Math.floor(Math.random() * members.length)].team
    })
  }
  return values
}

function getScoreboard (lim = 5, challenges, teams) {
  const max = 1e12
  const min = 1e13
  const values = []
  for (let index = 0; index < lim; index++) {
    values.push({
      eventId: challenges[Math.floor(Math.random() * challenges.length)].eventId,
      challenge: challenges[Math.floor(Math.random() * challenges.length)].title,
      team: teams[Math.floor(Math.random() * teams.length)].name,
      points: String(Math.floor(Math.random() * (max - min + 1)) + min)
    })
  }
  return values
}

(async function main () {
  const usersRaw = genUsers(10)
  console.log(`Generando datos de usuarios... Total: ${usersRaw.length} usuarios`)
  const _users = await db.insert(users).values(usersRaw).returning()
  console.log(`Datos de usuarios generados y guardados en la base de datos. Total: ${_users.length} usuarios`)

  const teamsRaw = genTeams(10)
  console.log(`Generando datos de equipos... Total: ${teamsRaw.length} equipos`)
  const _teams = await db.insert(teams).values(teamsRaw).returning()
  console.log(`Datos de equipos generados y guardados en la base de datos. Total: ${_teams.length} equipos`)

  const eventsRaw = genEvents(10)
  console.log(`Generando datos de eventos... Total: ${eventsRaw.length} eventos`)
  const _events = await db.insert(events).values(eventsRaw).returning()
  console.log(`Datos de eventos generados y guardados en la base de datos. Total: ${_events.length} eventos`)

  const challengesRaw = genChallenges(30, _events)
  console.log(`Generando datos de desafíos... Total: ${challengesRaw.length} desafíos`)
  const _challenges = await db.insert(challenges).values(challengesRaw).returning()
  console.log(`Datos de desafíos generados y guardados en la base de datos. Total: ${_challenges.length} desafíos`)

  const membersRaw = genMembers(10, _users, _teams)
  console.log(`Generando datos de miembros... Total: ${membersRaw.length} miembros`)
  const _members = await db.insert(members).values(membersRaw).returning()
  console.log(`Datos de miembros generados y guardados en la base de datos. Total: ${_members.length} miembros`)

  const participationsRaw = getParticipations(10, _members, events)
  console.log(`Generando datos de participaciones... Total: ${participationsRaw.length} participaciones`)
  const _participations = await db.insert(participations).values(participationsRaw).returning()
  console.log(`Datos de participaciones generados y guardados en la base de datos. Total: ${_participations.length} participaciones`)

  const scoreboardRaw = getScoreboard(10, _challenges, _teams)
  console.log(`Generando datos de tabla de puntuación... Total: ${scoreboardRaw.length} registros en la tabla de puntuación`)
  const _scoreboard = await db.insert(scoreboards).values(scoreboardRaw).returning()
  console.log(`Datos de tabla de puntuación generados y guardados en la base de datos. Total: ${_scoreboard.length} registros en la tabla de puntuación`)
})()
