import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  
  const currentUser = request.cookies.get('@nextauth.token')?.value

  
 

  if (currentUser && request.nextUrl.pathname.startsWith('/pages/Form')) {
    return Response.redirect(new URL('/', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/pages/Form')) {
    return Response.redirect(new URL('/pages/Form', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}