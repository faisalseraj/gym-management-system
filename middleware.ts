import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from './auth.config';
// middleware.js
import { getToken } from 'next-auth/jwt';
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};



export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET as  string } as any);
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    if (isLoggedIn) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  } else if (isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}
