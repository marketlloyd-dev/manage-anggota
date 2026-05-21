import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string; role: string; divisi: string };
  } catch {
    return null;
  }
}

export async function createToken(user: { email: string; role: string; divisi: string }) {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(secret);
}