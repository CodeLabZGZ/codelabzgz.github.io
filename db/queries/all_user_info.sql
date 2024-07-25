-- behold, the mega query
-- this is scary

-- get all number of events of the members of the team
WITH team_members AS (
  SELECT
    u.id,
    m.team
  FROM
    user u
    INNER JOIN members m ON u.id = m.user
  WHERE
    m.team = 'Pacocha and Sons'
), 
user_events AS (
SELECT
  -- distinct users
  DISTINCT um.id AS user_id,
  -- um.*,
  -- count null user participations as 0
  COUNT(pt.user) AS event_participations
FROM
  (
    SELECT
      u.*,
      m.team
    FROM
      user u
      INNER JOIN members m ON u.id = m.user
    WHERE
      m.team = 'Pacocha and Sons'
  ) um
  -- we ensure all users of the team appear
  LEFT JOIN participations pt ON um.id = pt.user
GROUP BY
  user_id
ORDER BY user_id ASC),
user_points AS (
-- get total challenge points of each user in the team and its information 
-- (and 0 if the user didn't participate in any challenge)
SELECT
  u.id AS user_id,
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
      m.team = 'Pacocha and Sons'
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
  ) up ON u.id = up.user 
ORDER BY user_id ASC),
user_podiums AS (
  
  SELECT
    tm.id AS user_id,
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
  GROUP BY pd.user
  ORDER BY user_id ASC)

SELECT u.*, event_participations, challenge_points, podiums 
FROM 
  user_events ue INNER JOIN 
  user_points upt INNER JOIN 
  user_podiums up INNER JOIN 
  user u ON u.id = up.user_id;