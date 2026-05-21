import { getData, setData } from '@/lib/data-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const meetings = await getData<any[]>('absensi_meetings');
  return NextResponse.json(meetings || []);
}

export async function POST(req: Request) {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'sekretaris'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { title, date } = await req.json();
  const meeting = { id: Date.now().toString(), title, date };
  const meetings = (await getData<any[]>('absensi_meetings')) || [];
  meetings.push(meeting);
  await setData('absensi_meetings', meetings);
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { meetingId } = await req.json();
  const key = `absensi:${meetingId}`;
  const absensi = (await getData<Record<string, boolean>>(key)) || {};
  absensi[user.email] = true;
  await setData(key, absensi);
  return NextResponse.json({ success: true });
}