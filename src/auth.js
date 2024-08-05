import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import Github from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Github, Discord],
  callbacks: {
    authorized: async ({ request, auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    session: async ({ session, token }) => {
      if (session?.user) session.user.id = token.sub
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) token.uid = user.id
      return token
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    newUser: "/settings",
    signOut: "/"
  },
  useSecureCookies: process.env.NODE_ENV === "production"
})
