import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware is running for:', request.url);

  const token = request.cookies.get('token')?.value;

  if (!token) {
    // ถ้าไม่มี token ให้ redirect ไปที่หน้าล็อกอิน
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // หากมี token ให้ดำเนินการต่อ
  return NextResponse.next();
}

// Matcher เพื่อกำหนดเส้นทางที่ต้องการให้ Middleware ทำงาน
export const config = {
  matcher: ['/student/:path*', '/teacher/:path*'], // ระบุเส้นทางที่ต้องการ
};
