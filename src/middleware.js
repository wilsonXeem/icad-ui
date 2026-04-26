import { NextResponse } from 'next/server';

const SESSION_HINT_COOKIE = 'icad_session';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const hasSessionHint = request.cookies.get(SESSION_HINT_COOKIE)?.value === 'active';
  const isProtectedRoute =
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/activity-portal' ||
    pathname.startsWith('/activity-portal/') ||
    pathname === '/admin' ||
    pathname.startsWith('/admin/');
  const isAuthRoute = pathname === '/login' || pathname === '/signup' || pathname === '/register';

  if (isProtectedRoute && !hasSessionHint) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && hasSessionHint) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/activity-portal/:path*', '/admin/:path*', '/login', '/signup', '/register'],
};
