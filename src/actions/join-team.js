"use server"

import { db } from "@/db"
import { members } from "@/schema"

export const joinTeam = async ({ id, name }) => {
  return new Promise((resolve, reject) => {
    db.transaction(async (tx) => {
      tx.insert(members).values({ user: id, team: name, role: "pending" })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          if (err.message.includes("UNIQUE constraint failed")) {
            reject(new Error("Asegurate de no ser el propietario del equipo.<br/> Puedes gestionar tus solicitudes <a href='/teams' target='_black' referrerPolicy='no-referrer'><u><strong>aquí</strong></u></a>"))
          }
          console.error(err.message)
          reject(new Error("Estamos teniendo problemas para mandar tu solicitud. Por favor, inténtalo nuevamente más tarde."))
        })
    })
  })
}
