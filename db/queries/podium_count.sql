-- get the number of podiums of each user
WITH team_members AS (
  SELECT
    u.*,
    m.team
  FROM
    user u
    INNER JOIN members m ON u.id = m.user
  WHERE
    m.team = 'Pacocha and Sons'
)
  
SELECT
  tm.id,
  COUNT(position) AS podiums
FROM
  team_members tm 
  LEFT JOIN (SELECT
    ps.event,
    ps.challenge,
    ps.user,
    ps.best_points,
    ps.timestamp,
    ps.position
  FROM
    (
      SELECT
        sc.*,
        DENSE_RANK() OVER (
          PARTITION BY
            sc.challenge
          ORDER BY
            sc.best_points DESC
        ) AS position
      FROM
        (
          SELECT
            sc.event,
            sc.challenge,
            sc.user,
            sc.timestamp,
            MAX(sc.points) AS best_points
          FROM
            scoreboards sc
          WHERE sc.user in (SELECT tm.id FROM team_members tm)
          GROUP BY
            sc.challenge,
            sc.user
          ORDER BY
            best_points DESC
        ) sc
      ORDER BY
        sc.challenge,
        sc.best_points DESC
    ) ps 
  WHERE
    position <= 3) pd
  ON tm.id = pd.user
GROUP BY pd.user;
