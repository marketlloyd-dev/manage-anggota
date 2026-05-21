import { getData } from '@/lib/data-helpers';
import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await getData<any>(`user:${email}`);
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Login gagal' }, { status: 401 });
    }

    const token = await createToken({ email: user.email, role: user.role, divisi: user.divisi });
    const cookieStore = await cookies();
    cookieStore.set('token', token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}