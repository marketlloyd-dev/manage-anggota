import { listBlobData, setBlobData, getBlobData } from '@/lib/blob-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

// GET semua anggota (tanpa password)
export async function GET() {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'sekretaris'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const anggota = await listBlobData<any>('users/');
  const safe = anggota.map(({ password, ...rest }: any) => rest);
  return NextResponse.json(safe);
}

// POST tambah anggota baru (hanya ketua)
export async function POST(req: Request) {
  const currentUser = await getUserFromToken();
  if (!currentUser || currentUser.role !== 'ketua') {
    return NextResponse.json({ error: 'Hanya ketua yang bisa menambah anggota' }, { status: 403 });
  }

  const { name, email, password, role, divisi } = await req.json();
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
  }

  // Cek apakah email sudah ada
  const existing = await getBlobData(`users/${email}.json`);
  if (existing) {
    return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 });
  }

  const newUser = { name, email, password, role, divisi: divisi || '' };
  await setBlobData(`users/${email}.json`, newUser);

  return NextResponse.json({ success: true, user: { name, email, role, divisi } });
}