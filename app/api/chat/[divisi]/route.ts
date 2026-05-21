import { lpush } from '@/lib/data-helpers';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, context: { params: Promise<{ divisi: string }> }) {
  const { divisi } = await context.params;
  const { user, text } = await req.json();
  if (!user || !text) {
    return NextResponse.json({ error: 'user dan text wajib' }, { status: 400 });
  }
  const msg = JSON.stringify({ user, text, timestamp: Date.now() });
  await lpush(`chat:${divisi}`, msg);
  return NextResponse.json({ success: true });
}