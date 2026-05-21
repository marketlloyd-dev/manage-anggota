import { getBlobData, setBlobData } from '@/lib/blob-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const laporan = await getBlobData<any[]>('laporan.json');
  return Response.json(laporan || []);
}

export async function POST(req: Request) {
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { divisi, isi } = await req.json();
  const id = Date.now().toString();
  const laporanItem = { id, divisi, penulis: user.email, isi, timestamp: Date.now(), status: 'baru' };
  const laporan = (await getBlobData<any[]>('laporan.json')) || [];
  laporan.push(laporanItem);
  await setBlobData('laporan.json', laporan);
  
  // Notifikasi ke ketua
  const notif = { id, pesan: `Laporan baru dari divisi ${divisi}`, dibaca: false, timestamp: Date.now() };
  const notifs = (await getBlobData<any[]>('notif_ketua.json')) || [];
  notifs.push(notif);
  await setBlobData('notif_ketua.json', notifs);
  
  return NextResponse.json({ success: true });
}