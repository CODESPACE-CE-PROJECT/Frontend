import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { cookies } from 'next/headers'
import axios, { AxiosResponse } from "axios";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Role } from "./app/enum/enum";

interface IJwt {
  username: string;
  role: Role;
  schoolId: string;
  iat: number;
  exp: number;
}

const getAccessToken = async (refreshToken: string) => {
  try {
    if (refreshToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
      const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`)
      if (response.status === 201) {
        const accessToken: string | null = response.data.accessToken;
        const refreshToken: string | null = response.data.refreshToken;

        if (accessToken && refreshToken) {
          const accessTokenExpiration = 60 * 60;
          const refreshTokenExpiration = 7 * 24 * 60 * 60;

          (await cookies()).set('accessToken', accessToken, { maxAge: accessTokenExpiration });
          (await cookies()).set('refreshToken', refreshToken, { maxAge: refreshTokenExpiration });
        }
      }
    }
  } catch (error) {
    throw new Error('Error Fetch Refresh Token')
  }
};


export default async function middleware(request: NextRequest) {
  const accessToken = (await cookies()).get('accessToken')?.value || null
  const refreshToken = (await cookies()).get('refreshToken')?.value || null

  if (!accessToken && refreshToken) {
    await getAccessToken(refreshToken)
  }

  const newAccessToken = (await cookies()).get('accessToken')?.value || null;

  if (!newAccessToken || !refreshToken) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decodedToken = jwtDecode<IJwt>(newAccessToken);
    const decodedRefreshToken = jwtDecode<IJwt>(refreshToken)
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime >= decodedRefreshToken.exp) {
      (await cookies()).delete('refreshToken')
    }

    if (currentTime >= decodedToken.exp) {
      (await cookies()).delete('accessToken')
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const currentPath = request.nextUrl.pathname;

    switch (decodedToken.role) {
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
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/student/:path*", "/teacher/:path*", "/admin/:path*"],
};