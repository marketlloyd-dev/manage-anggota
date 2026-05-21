import { getData, setData } from '@/lib/data-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const laporan = await getData<any[]>('laporan');
  return NextResponse.json(laporan || []);
}

export async function POST(req: Request) {
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { divisi, isi } = await req.json();
  const id = Date.now().toString();
  const item = { id, divisi, penulis: user.email, isi, timestamp: Date.now(), status: 'baru' };
  const laporan = (await getData<any[]>('laporan')) || [];
  laporan.push(item);
  await setData('laporan', laporan);

  const notifs = (await getData<any[]>('notif_ketua')) || [];
  notifs.push({ id, pesan: `Laporan baru dari ${divisi}`, dibaca: false, timestamp: Date.now() });
  await setData('notif_ketua', notifs);
  return NextResponse.json({ success: true });
}