import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname === '/setup') return NextResponse.next(); // izinkan setup

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      const user = payload as any;

      if (pathname === '/login') return NextResponse.redirect(new URL('/dashboard', req.url));

      // Proteksi role
      if (pathname.startsWith('/dashboard/keuangan') && !['ketua', 'bendahara'].includes(user.role))
        return NextResponse.redirect(new URL('/dashboard', req.url));
      if (pathname.startsWith('/dashboard/anggota') && !['ketua', 'sekretaris'].includes(user.role))
        return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch {
      const res = NextResponse.redirect(new URL('/login', req.url));
      res.cookies.delete('token');
      return res;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};