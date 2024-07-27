-- get all number of events of the members of the team
SELECT
  -- distinct users
  DISTINCT um.id,
  -- um.*,
  -- count null user participations as 0
  COUNT(pt.user) AS ev_participations
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
  um.id;