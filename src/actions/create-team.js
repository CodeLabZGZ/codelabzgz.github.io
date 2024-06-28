"use server"

import { members, teams } from "@/schema"

import { db } from "@/db"

export const createTeam = async ({ id, name, motto, slug }) => {
  return new Promise((resolve, reject) => {
    db.transaction(async tx => {
      tx.insert(teams)
        .values({ name, motto, slug })
        .returning({ name: teams.name, slug: teams.slug })
        .then(async data => {
          await tx
            .insert(members)
            .values({ user: id, team: name, role: "admin" })
            .catch(async err => {
              console.error(err)
              tx.rollback()
              reject(
                new Error(
                  "Estamos teniendo problemas al crear tu equipo. Por favor, inténtalo nuevamente más tarde."
                )
              )
            })
          resolve(data[0])
        })
        .catch(err => {
          if (err.message.includes("UNIQUE constraint failed")) {
            const field = err.message.split(".")[1].trim()
            reject(
              new Error(`El campo <strong>${field}</strong> debe ser único.`)
            )
          }
          console.error(err)
          reject(
            new Error(
              "Estamos teniendo problemas al crear tu equipo. Por favor, inténtalo nuevamente más tarde."
            )
          )
        })
    })
  })
}
