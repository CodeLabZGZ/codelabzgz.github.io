import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import authConfig from "./auth.config"

export const { auth } = NextAuth(authConfig)

const protectedRoutes = [
  "/events",
  "/teams",
  "/profile"
]

export default async function middleware (request) {
  const session = await auth()

  const { pathname, origin } = request.nextUrl

  const isProtectedRoute = protectedRoutes.some((prefix) => pathname.startsWith(prefix))

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL("/auth/login", origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
