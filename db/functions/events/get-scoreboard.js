import { db } from "@/db"
import { sql } from "drizzle-orm"

export const getScoreboard = async ({ id }) => {
  const data = db
    .all(
      sql`
    SELECT r.challenge, r.id, r.image, r.name, r.points, r.timestamp
    FROM (
    -- PUNTOS MAXIMOS DE UN EQUIPO EN EL EVENTO 1 / CHALLENGE - (INCLUYE FECHA
    SELECT MT.challenge, t.slug as id, t.image, t.name, MT.points, lb.timestamp
    FROM (
      -- PUNTOS MAXIMOS DE UN EQUIPO EN EL EVENTO 1 / CHALLENGE - (NO INCLUYE FECHA)
      SELECT sc.event, sc.challenge, sc.team, MAX(sc.points) as points
      FROM scoreboards sc
      WHERE event = ${id} AND sc.team not NULL
      GROUP BY sc.event, sc.challenge, sc.team
    ) MT
    INNER JOIN scoreboards lb ON lb.event = MT.event AND lb.challenge = MT.challenge AND lb.team = MT.team AND lb.points = MT.points
    INNER JOIN teams t ON t.slug = MT.team
    UNION
    -- PUNTOS MAXIMOS DE UN USUARIO SIN EQUIPO EN EL EVENTO 1 / CHALLENGE
    SELECT sc.challenge, u.id, u.image, u.name, sc.points, sc.timestamp
    FROM scoreboards sc
    INNER JOIN user u ON u.id = sc.user
    WHERE event = ${id} AND sc.team IS NULL
    ) r
    ORDER BY r.challenge, r.points DESC, r.timestamp;
  `
    )
    .map(({ challenge, points, timestamp, ...participant }) => ({
      challenge,
      participant: { ...participant },
      points,
      timestamp
    }))

  return data
}
