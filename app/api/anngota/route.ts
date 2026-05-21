import { listKeys, getData, setData } from '@/lib/data-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const currentUser = await getUserFromToken();
  if (!currentUser || !['ketua', 'sekretaris'].includes(currentUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const keys = await listKeys('user:');
  const anggota = [];
  for (const key of keys) {
    const data = await getData<any>(key);
    if (data) {
      const { password, ...rest } = data;
      anggota.push(rest);
    }
  }
  return NextResponse.json(anggota);
}

export async function POST(req: Request) {
  const currentUser = await getUserFromToken();
  if (!currentUser || currentUser.role !== 'ketua') {
    return NextResponse.json({ error: 'Hanya ketua' }, { status: 403 });
  }
  const { name, email, password, role, divisi } = await req.json();
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
  }
  if (await getData(`user:${email}`)) {
    return NextResponse.json({ error: 'Email sudah ada' }, { status: 409 });
  }
  await setData(`user:${email}`, { name, email, password, role, divisi: divisi || '' });
  return NextResponse.json({ success: true });
}