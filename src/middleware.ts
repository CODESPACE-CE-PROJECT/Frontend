import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware is running for:', request.url);

  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.redirect(new URL('/teacher/courses', request.url));
}

export const config = {
  matcher: ['/','/student/:path*', '/teacher/:path*'],
};
