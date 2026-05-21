import { getData, setData } from '@/lib/data-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'bendahara'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const data = await getData<any[]>('keuangan');
  return NextResponse.json(data || []);
}

export async function POST(req: Request) {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'bendahara'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { jumlah, keterangan } = await req.json();
  const current = (await getData<any[]>('keuangan')) || [];
  current.push({ jumlah, keterangan, timestamp: Date.now() });
  await setData('keuangan', current);
  return NextResponse.json({ success: true });
}