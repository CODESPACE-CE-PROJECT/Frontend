import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Corrected import

interface IJwt {
  username: string;
  role: string;
  schoolId: string;
  iat: number;
  exp: number;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    if(request.url.includes('/login')){
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwtDecode<IJwt>(token);
    if (Date.now() >= decoded.exp * 1000) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const currentPath = request.nextUrl.pathname;
    switch (decoded.role) {
      case "ADMIN":
        if (!currentPath.startsWith("/admin") || currentPath.includes('/login')) {
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
        break;
      case "TEACHER":
        if (!currentPath.startsWith("/teacher") || currentPath.includes('/login')) {
          return NextResponse.redirect(
            new URL("/teacher/courses", request.url)
          );
        }
        break;
      case "STUDENT":
        if (!currentPath.startsWith("/student") || currentPath.includes('/login')) {
          return NextResponse.redirect(
            new URL("/student/courses", request.url)
          );
        }
        break;
      default:
        console.warn("Invalid role, redirecting to login.");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/","/login","/student/:path*", "/teacher/:path*", "/admin/:path*"],
};
