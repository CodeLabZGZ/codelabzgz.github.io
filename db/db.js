import * as schemas from "@/schemas"

import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

const client = createClient(
  process.env.NODE_ENV === "production"
    ? {
        url: process.env.DATABASE_URL,
        authToken: process.env.DATABASE_AUTH_TOKEN
      }
    : {
        url: process.env.DATABASE_URL
      }
)
export const db = drizzle(client, { schema: { ...schemas } })
