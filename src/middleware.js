import { auth } from "@/auth"
import { NextResponse } from "next/server"

const whiteList = ["/", "/auth/login", "/privacy", "/terms", "/faq"]

export default async function middleware(request) {
  const { pathname, origin } = request.nextUrl

  try {
    const session = await auth()

    const whitelisted = whiteList.includes(pathname)

    // Si no está en la whitelist y no hay sesión válida, redirige al login
    if (!whitelisted && (!session || !session.user)) {
      const absoluteURL = new URL("/auth/login", origin)
      return NextResponse.redirect(absoluteURL.toString())
    }

    // Si todo está bien, permite el acceso
    return NextResponse.next()
  } catch (error) {
    // Redirige al login en caso de error de autenticación
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
