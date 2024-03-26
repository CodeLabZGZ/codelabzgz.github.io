import { db } from "db"
import { users, team, events, challenges, members, participations, events, challenges, members } from "db/schema"
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

function getParticipations (lim = 5, users, teams, events) {
  const values = []
  for (let index = 0; index < lim; index++) {
    values.push({
    })
  }
  return values
}

(async function main () {
  const usersRaw = genUsers(10)
  const teamsRaw = genTeams(10)
  const eventsRaw = genEvents(10)

  const users = await db.insert(users).values(usersRaw).returning()
  const teams = await db.insert(teams).values(teamsRaw).returning()
  const events = await db.insert(events).values(eventsRaw).returning()

  const challengesRaw = genChallenges(30, events)
  const challenges = await db.insert(challenges).values(challengesRaw).returning()

  const membersRaw = genMembers(10, users, teams)
  const members = await db.insert(members).values(membersRaw).returning()

  const participationsRaw = getParticipations(10, users, teams, events)
  const participations = await db.insert(participations).values(participationsRaw).returning()
})()
