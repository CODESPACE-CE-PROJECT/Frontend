import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decrypt, deleteSession, getAccessToken } from "@/lib/session";
import { Role } from "@/enum/enum";

// Define the allowed base paths for each role
const roleRoutes = {
  [Role.ADMIN]: "/admin",
  [Role.TEACHER]: "/teacher",
  [Role.STUDENT]: "/student",
};

const publicRoutes = ["/login", "/forgot-password"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  // Redirect users to login if they visit "/" without authentication
  if (path === "/" && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!refreshToken) {
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = await decrypt(refreshToken);

  if (!payload?.username) {
    deleteSession();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  await getAccessToken(refreshToken);

  const userRole = payload.role;
  const allowedRoute = roleRoutes[userRole];

  // If user visits "/" and is logged in, redirect them to their role's main page
  if (path === "/") {
    return NextResponse.redirect(new URL(`${allowedRoute}/course`, req.url));
  }

  // Restrict users from accessing another role's section
  const isAccessingOtherRole =
    (userRole === Role.STUDENT && !path.startsWith("/student")) ||
    (userRole === Role.TEACHER && !path.startsWith("/teacher")) ||
    (userRole === Role.ADMIN && !path.startsWith("/admin"));

  if (isAccessingOtherRole && !isPublicRoute) {
    return NextResponse.redirect(new URL(`${allowedRoute}/course`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
