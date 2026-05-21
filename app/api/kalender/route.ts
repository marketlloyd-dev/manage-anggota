import { getData, setData } from '@/lib/data-helpers';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const events = await getData<any[]>('kalender');
  return NextResponse.json(events || []);
}

export async function POST(req: Request) {
  const { title, start, end, divisi } = await req.json();
  const event = { title, start, end, divisi };
  const current = (await getData<any[]>('kalender')) || [];
  current.push(event);
  await setData('kalender', current);
  return NextResponse.json({ success: true });
}