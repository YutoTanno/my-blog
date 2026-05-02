import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // デバッグ: Cookie名を全部ログに出す
  const cookies = [...request.cookies.getAll()];
  console.log('=== COOKIES ===', cookies.map(c => c.name));

  const hasSession = cookies.some(c =>
    c.name.includes('supabase') ||
    c.name.includes('sb-') ||
    c.name.includes('auth') ||
    c.name.startsWith('sb.')
  );

  console.log('=== hasSession ===', hasSession);

  if (!hasSession && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};