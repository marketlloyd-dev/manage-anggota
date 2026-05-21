import { getBlobData, setBlobData } from '@/lib/blob-helpers';

export async function GET() {
  const events = await getBlobData<any[]>('kalender.json');
  return Response.json(events || []);
}

export async function POST(req: Request) {
  const { title, start, end, divisi } = await req.json();
  const event = { title, start, end, divisi };
  const current = (await getBlobData<any[]>('kalender.json')) || [];
  current.push(event);
  await setBlobData('kalender.json', current);
  return Response.json({ success: true });
}