import { getBlobData, setBlobData } from '@/lib/blob-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'bendahara'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const data = await getBlobData<any[]>('keuangan.json');
  return Response.json(data || []);
}

export async function POST(req: Request) {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'bendahara'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { jumlah, keterangan } = await req.json();
  const entry = { jumlah, keterangan, timestamp: Date.now() };
  const current = (await getBlobData<any[]>('keuangan.json')) || [];
  current.push(entry);
  await setBlobData('keuangan.json', current);
  return Response.json({ success: true });
}