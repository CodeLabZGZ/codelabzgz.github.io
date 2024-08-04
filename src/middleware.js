import { auth } from "@/auth"
import { NextResponse } from "next/server"

const whiteList = ["/", "/auth/login", "/privacy", "/terms"]

export default async function middleware(request) {
  const session = await auth()
  const { pathname, origin } = request.nextUrl
  try {
    const whitlisted = whiteList.includes(pathname)

    // If token is valid, proceed to the protected route
    if (!whitlisted && (!session || !session.user)) {
      const absoluteURL = new URL("/auth/login", origin)
      return NextResponse.redirect(absoluteURL.toString())
    }
  } catch (error) {
    // Redirects to the login page on failed authentication
    const absoluteURL = new URL("/auth/login", origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" }
      ]
    }
  ]
}
