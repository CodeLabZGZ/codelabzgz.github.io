import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) session.user.id = token.sub
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) token.uid = user.id
      return token
    }
  },
  session: { strategy: "jwt" },
  ...authConfig
})
