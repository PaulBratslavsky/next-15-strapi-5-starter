import { auth } from "@/auth"
import { NextResponse } from "next/server"

// List of routes that require authentication
const protectedRoutes = ["/dashboard", "/suggestions"]

console.log(protectedRoutes)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
})

// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}