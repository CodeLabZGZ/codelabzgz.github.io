import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"
import NextAuth from "next-auth"

export const {
  handlers: { GET, POST },
  signIn, signOut,
  auth
} = NextAuth({
  providers: [
    Discord,
    GitHub
  ],
  basePath: "/api/auth",
  pages: {
    error: "/auth/login",
    signIn: "/auth/login",
    signOut: "/"
  }
})
