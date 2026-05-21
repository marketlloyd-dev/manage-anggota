import { getBlobData, setBlobData } from '@/lib/blob-helpers';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const meetings = await getBlobData<any[]>('absensi_meetings.json');
  return Response.json(meetings || []);
}

export async function POST(req: Request) {
  const user = await getUserFromToken();
  if (!user || !['ketua', 'sekretaris'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { title, date } = await req.json();
  const meeting = { id: Date.now().toString(), title, date };
  const meetings = (await getBlobData<any[]>('absensi_meetings.json')) || [];
  meetings.push(meeting);
  await setBlobData('absensi_meetings.json', meetings);
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { meetingId } = await req.json();
  // Ambil atau buat absensi per meeting
  const absensi = (await getBlobData<Record<string, boolean>>(`absensi_${meetingId}.json`)) || {};
  absensi[user.email] = true;
  await setBlobData(`absensi_${meetingId}.json`, absensi);
  return NextResponse.json({ success: true });
}