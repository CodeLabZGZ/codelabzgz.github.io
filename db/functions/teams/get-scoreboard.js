import { db } from "@/db"
import { sql } from "drizzle-orm"

export const getScoreboard = async () => {
  const data = db
    .all(
      sql`
    -- PUNTOS MAXIMOS DE UN EQUIPO EN EL EVENTO 1 / CHALLENGE - (INCLUYE FECHA)
    SELECT t.slug AS slug, t.image, t.name, r.cpoints as points
    FROM (
      SELECT MT.team, SUM(c.points) AS cpoints, SUM(MT.points) AS spoints
      FROM (
      -- PUNTOS MAXIMOS DE UN EQUIPO EN EL EVENTO 1 / CHALLENGE - (NO INCLUYE FECHA)
        SELECT sc.event, sc.challenge, sc.team, MAX(sc.points) AS points
        FROM scoreboards sc
        WHERE sc.team NOT NULL
        GROUP BY sc.event, sc.challenge, sc.team
      ) MT
      INNER JOIN scoreboards lb ON lb.event = MT.event AND lb.challenge = MT.challenge AND lb.team = MT.team AND lb.points = MT.points
      INNER JOIN challenges c ON c.title = MT.challenge
      GROUP BY MT.team
    ) r
    INNER JOIN teams t ON t.slug = r.team
    ORDER BY r.cpoints DESC, r.spoints DESC
  `
    )
    .map(({ points, ...team }, rank) => ({
      rank: rank + 1,
      team: { ...team },
      points
    }))

  return data
}
