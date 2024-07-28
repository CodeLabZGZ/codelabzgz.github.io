import * as schemas from "@/schemas"

import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"

const client = new Database(process.env.DATABASE_URL)
export const db = drizzle(client, { schema: { ...schemas } })
