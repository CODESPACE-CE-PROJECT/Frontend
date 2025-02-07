import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { decrypt, deleteSession, getAccessToken } from "@/lib/session";
import { Role } from "@/enum/enum";

const protectedRoute = ['/teacher', '/student', '/admin']
const publicRoute = ['/login', '/forgot-password', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoute.includes(path)
  const isPublicRoute = publicRoute.includes(path)

  const refreshToken = (await cookies()).get('refreshToken')?.value
  const payload = await decrypt(refreshToken)

  if (isProtectedRoute && !payload?.username) {
    deleteSession()
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  await getAccessToken(refreshToken)


  if (!refreshToken) {
    if (isPublicRoute) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && payload?.username) {
    if (payload.role === Role.ADMIN && !path.startsWith('/admin')) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl))
    } else if (payload.role === Role.TEACHER && !path.startsWith('/teacher')) {
      return NextResponse.redirect(new URL("/teacher/course", req.nextUrl))
    } else if (payload.role === Role.STUDENT && !path.startsWith('/student')) {
      return NextResponse.redirect(new URL("/student/course", req.nextUrl))
    } else {
      return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};