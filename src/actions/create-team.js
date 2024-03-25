"use server"

import { db } from "db"
import { teams } from "db/schema"

export const createTeam = async ({ name, motto, slug }) => {
  return new Promise((resolve, reject) => setTimeout(async () => {
    db.insert(teams).values({ name, motto, slug }).returning({ name: teams.name, slug: teams.slug })
      .then((data) => resolve(data[0]))
      .catch((err) => {
        if (err.message.includes("UNIQUE constraint failed")) {
          const field = err.message.split(".")[1].trim()
          reject(new Error(`El campo <strong>${field}</strong> debe ser único.`))
        }
        console.log(err)
        reject(new Error("Estamos teniendo problemas al crear tu equipo. Por favor, inténtalo nuevamente más tarde."))
      })
  }, 2000))
}
