-- get total challenge points of each user and its information (and 0 if the user didn't participate in any challenge)
SELECT
  u.*,
  COALESCE(challenge_points, 0) AS challenge_points
FROM
  user u
  LEFT JOIN (
    SELECT
      u.id,
      SUM(ch.points) AS challenge_points
    FROM
      user u
      LEFT JOIN (
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
      ) scores ON u.id = scores.user
      INNER JOIN challenges ch ON scores.challenge = ch.title
      AND scores.event = ch.event
    GROUP BY
      scores.user
  ) up ON u.id = up.id;