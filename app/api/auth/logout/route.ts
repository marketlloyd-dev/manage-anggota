import { cookies } from 'next/headers';
export async function GET() {
  cookies().delete('token');
  return Response.redirect(new URL('/login', process.env.NEXT_PUBLIC_URL || ''));
}