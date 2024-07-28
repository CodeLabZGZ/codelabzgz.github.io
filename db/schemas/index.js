// Importar todas las dependencias
import { accounts } from "@/schemas/accounts"
import { challenges, challengesRelations } from "@/schemas/challenges"
import { events, eventsRelations } from "@/schemas/events"
import { members, membersRelations } from "@/schemas/members"
import {
  participations,
  participationsRelations
} from "@/schemas/participations"
import { scoreboards, scoreboardsRelations } from "@/schemas/scoreboards"
import { sessions, verificationTokens } from "@/schemas/sessions"
import { teams, teamsRelations } from "@/schemas/teams"
import { tests, testsRelations } from "@/schemas/tests"
import { users, usersRelations } from "@/schemas/users"

// Exportar cada dependencia por separado
export {
  accounts,
  challenges,
  challengesRelations,
  events,
  eventsRelations,
  members,
  membersRelations,
  participations,
  participationsRelations,
  scoreboards,
  scoreboardsRelations,
  sessions,
  teams,
  teamsRelations,
  tests,
  testsRelations,
  users,
  usersRelations,
  verificationTokens
}

// Exportar todas las dependencias juntas en un solo objeto
const schema = {
  ...users,
  ...usersRelations,
  ...teams,
  ...teamsRelations,
  ...challenges,
  ...challengesRelations,
  ...scoreboards,
  ...scoreboardsRelations,
  ...tests,
  ...testsRelations,
  ...accounts,
  ...sessions,
  ...verificationTokens,
  ...participations,
  ...participationsRelations,
  ...members,
  ...membersRelations,
  ...events,
  ...eventsRelations
}

export default schema
