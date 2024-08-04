import "dotenv/config"

/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "sqlite",
  driver: "turso",
  schema: "./db/schemas/*.js",
  out: "./db/drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  strict: true,
  verbose: true
}
