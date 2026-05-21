import { listKeys, getData, setData } from '@/lib/data-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'sekretaris'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const currentUser = await getUserFromToken();
  if (!currentUser || currentUser.role !== 'ketua') {
    return NextResponse.json({ error: 'Hanya ketua yang bisa menambah anggota' }, { status: 403 });
  }
  try {
    const { name, email, password, role, divisi } = await req.json();
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }
    const exists = await getData(`user:${email}`);
    if (exists) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 });
    }
    const newUser = { name, email, password, role, divisi: divisi || '' };
    await setData(`user:${email}`, newUser);
    return NextResponse.json({ success: true, user: { name, email, role, divisi } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}