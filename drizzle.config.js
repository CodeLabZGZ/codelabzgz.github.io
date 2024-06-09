import 'dotenv/config'

import path from 'path';

/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "sqlite",
  schema: "./db/schema.js",
  out: "./db/drizzle",
  dbCredentials: {
    url: "file:" + path.resolve(__dirname, process.env.DB_URL)
  },
  strict: true,
  verbose: true
}
