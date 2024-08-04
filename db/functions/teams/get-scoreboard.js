import { db } from "@/db"
import { sql } from "drizzle-orm"

export const getScoreboard = async () => {
  const data = await db
    .all(
      sql`
-- TOTAL DE PUNTOS / EQUIPO + INFO DEL EQUIPO
SELECT t.slug AS slug, t.image, t.name, r.cpoints AS points
FROM (
  -- TOTAL DE PUNTOS / EQUIPO
  SELECT MT.team, SUM(c.points) AS cpoints, SUM(MT.points) AS spoints
  FROM (
    -- PUNTOS MAXIMOS DE UN EQUIPO / {EVENTO CHALLENGE} - (NO INCLUYE FECHA)
    SELECT sc.event, sc.challenge, sc.team, MAX(sc.points) AS points
    FROM scoreboards sc
    WHERE sc.team NOT NULL
    GROUP BY sc.event, sc.challenge, sc.team
  ) MT
  INNER JOIN challenges c ON c.title = MT.challenge
  GROUP BY MT.team
) r
INNER JOIN teams t ON t.slug = r.team
ORDER BY r.cpoints DESC, r.spoints DESC;
  `
    )
    .then(data =>
      data.map(({ points, ...team }, rank) => ({
        rank: rank + 1,
        team: { ...team },
        points
      }))
    )

  return data
}
