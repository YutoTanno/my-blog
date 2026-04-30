import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // /admin/login は認証不要
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Cookieからセッションを確認
  const hasSession =
    request.cookies.get('sb-access-token') ||
    request.cookies.has('sb-refresh-token') ||
    [...request.cookies.getAll()].some(c => c.name.includes('auth-token') || c.name.includes('supabase'));

  if (!hasSession && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};