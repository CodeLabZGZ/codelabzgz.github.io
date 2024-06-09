/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./db/schema.js",
  out: "./db/drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DB_URL
  }
}
