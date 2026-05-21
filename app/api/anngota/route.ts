import { listBlobData } from '@/lib/blob-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'sekretaris'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const anggota = await listBlobData<any>('users/');
  // Kembalikan tanpa password
  const safe = anggota.map(({ password, ...rest }) => rest);
  return NextResponse.json(safe);
}