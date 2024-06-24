import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('connect.sid')?.value;
  const response = NextResponse.next();
  const url = new URL(request.url);

  if (
    url.pathname === '/login' ||
    url.pathname === '/signup' ||
    url.pathname === '/forgot-password' ||
    url.pathname === '/onboarding'
  ) {
    return response;
  }

  if (!cookie) return NextResponse.redirect(new URL('/login', request.url));

  // TODO: Fix slow down caused by constant server side auth validation
  // Could use server for validating cookie exists
  // Than use client side to check if it's valid, or remove if it isn't
  // try {
  //   await useMeInvestorQuery.fetcher(
  //     {},
  //     {
  //       Cookie: request.cookies.toString(),
  //     }
  //   )();

  //   return response;
  // } catch (error) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
