import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decrypt, deleteSession, getAccessToken } from "@/lib/session";
import { Role } from "@/enum/enum";

const roleRoutes = {
  [Role.ADMIN]: "/admin/dashboard",
  [Role.TEACHER]: "/teacher/course",
  [Role.STUDENT]: "/student/course",
};

const publicRoutes = ["/login", "/forgot-password"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  
  const refreshToken = (await cookies()).get("refreshToken")?.value;

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

  if (path === "/") {
    return NextResponse.redirect(new URL(`${allowedRoute}`, req.url));
  }

  const isAccessingOtherRole =
    (userRole === Role.STUDENT && !path.startsWith("/student")) ||
    (userRole === Role.TEACHER && !path.startsWith("/teacher")) ||
    (userRole === Role.ADMIN && !path.startsWith("/admin"));

  if (isAccessingOtherRole && !isPublicRoute) {
    return NextResponse.redirect(new URL(`${allowedRoute}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
