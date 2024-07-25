
-- get total challenge points of each user in the team and its information 
-- (and 0 if the user didn't participate in any challenge)
SELECT
  u.*,
  u.team,
  COALESCE(challenge_points, 0) AS challenge_points
FROM
  (
    SELECT
      u.*,
      m.team
    FROM
      user u
      INNER JOIN members m ON u.id = m.user
    WHERE
      m.team = 'Pacocha and Sons' -- replace team name with param
  ) u
  LEFT JOIN (
    SELECT
      scores.user,
      SUM(ch.points) AS challenge_points
    FROM
      (
        SELECT
          sc.user,
          sc.challenge,
          sc.event,
          MAX(points) AS score
        FROM
          scoreboards sc
        GROUP BY
          sc.user,
          sc.challenge,
          sc.event
          -- for debugging purposes
          -- ORDER BY sc.event ASC
          -- LIMIT 15
      ) scores
      INNER JOIN challenges ch ON scores.challenge = ch.title
      AND scores.event = ch.event
    GROUP BY
      scores.user
  ) up ON u.id = up.user;
