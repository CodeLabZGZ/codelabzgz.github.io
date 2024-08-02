import { db } from "@/db"
import { sql } from "drizzle-orm"

export const getScoreboard = async () => {
  const data = await db
    .all(
      sql`
SELECT u.id, u.image, u.name, SUM(r.cpoints) AS points
FROM (
  -- ASIGNACION DE PUNTUACIONES A LAS PARTICIPACIONES
  SELECT *
  FROM participations p
  INNER JOIN (
    -- PUNTOS MAXIMOS DEL USUARIO EN PARTICIPACIONES SIN EQUIPO / EVENTO
    SELECT sc.event, sc.user, SUM(c.points) AS cpoints, SUM(sc.points) AS spoints
    FROM scoreboards sc
    INNER JOIN challenges c ON c.title = sc.challenge
    WHERE sc.team IS NULL
    GROUP BY sc.event, sc.user
  ) PU ON PU.event = p.event AND PU.user = p.user
  UNION
  -- ASIGNACION DE PUNTUACIONES A LAS PARTICIPACIONES
  SELECT *
  FROM participations p
  INNER JOIN ( 
    -- PUNTOS MAXIMOS POR EQUIPO / EVENTO
    SELECT MT.event, MT.team, SUM(c.points) AS cpoints, SUM(MT.points) AS spoints
    FROM (
      -- PUNTOS MAXIMOS DE UN EQUIPO / CHALLENGE
      SELECT sc.event, sc.challenge, sc.team, MAX(sc.points) AS points
      FROM scoreboards sc
      WHERE sc.team NOT NULL
      GROUP BY sc.event, sc.challenge, sc.team
    ) MT
    INNER JOIN challenges c ON c.title = MT.challenge
    GROUP BY MT.event, MT.team
  ) PT ON PT.event = p.event AND PT.team = p.team
) r
INNER JOIN user u ON u.id = r.user
GROUP BY r.user
ORDER BY points DESC, SUM(r.spoints) DESC
  `
    )
    .then(data =>
      data.map(({ points, ...user }, rank) => ({
        rank: rank + 1,
        user: { ...user },
        points
      }))
    )
  return data
}
