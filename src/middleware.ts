import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/profile', '/admin', '/manager'];
const authPaths = ['/login', '/register'];
// const adminPaths = ['/admin/:part*'];
// const managerPaths = ['/manager/:part*'];
const productEditRegex = /^\/products\/\d+\/edit$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;
  const sessionRole = request.cookies.get('sessionRole')?.value;

  if (pathname.startsWith('/admin') && sessionToken && sessionRole != 'ADMIN') {
    return NextResponse.redirect(new URL('/error', request.url));
  } 
  if (pathname.startsWith('/manager') && sessionToken && sessionRole != 'MANAGER') {
    return NextResponse.redirect(new URL('/error', request.url));
  } 
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
  if (pathname.match(productEditRegex) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }



  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/login', '/register', '/admin/:path*', '/manager/:path*']
}