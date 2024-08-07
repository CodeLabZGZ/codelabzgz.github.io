import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import Github from "next-auth/providers/github"
import Resend from "next-auth/providers/resend"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Github({ allowDangerousEmailAccountLinking: true }),
    Discord({ allowDangerousEmailAccountLinking: true }),
    Resend({
      allowDangerousEmailAccountLinking: true,
      from: "no-reply@codelabzgz.dev"
    })
  ],
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
  useSecureCookies: process.env.NODE_ENV === "production",
  debug: process.env.NODE_ENV !== "production"
})
