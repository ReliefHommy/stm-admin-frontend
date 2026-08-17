import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const GUARDED_PREFIXES = ['/admindashboard', '/food-dashboard', '/studio-dashboard']

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')
  const { pathname } = request.nextUrl

  if (!accessToken && GUARDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admindashboard/:path*', '/food-dashboard/:path*', '/studio-dashboard/:path*'],
}