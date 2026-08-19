import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-dev';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const isApiAdminRoute = pathname.startsWith('/api/admin');
  const isAdminRoute = pathname.startsWith('/admin');

  if (isApiAdminRoute || isAdminRoute) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return handleUnauthorized(request, isApiAdminRoute);
    }

    try {
      const { payload } = await jwtVerify(token, secretKey);
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.userId as string);
      requestHeaders.set('x-user-role', payload.role as string);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch {
      return handleUnauthorized(request, isApiAdminRoute);
    }
  }

  return NextResponse.next();
}

function handleUnauthorized(request: NextRequest, isApiRoute: boolean) {
  if (isApiRoute) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } else {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
