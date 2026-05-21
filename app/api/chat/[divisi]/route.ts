import { setBlobData } from '@/lib/blob-helpers';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  context: { params: Promise<{ divisi: string }> }
) {
  const { divisi } = await context.params;
  const { user, text } = await req.json();

  if (!user || !text) {
    return NextResponse.json(
      { error: 'user dan text wajib' },
      { status: 400 }
    );
  }

  const msg = { user, text, timestamp: Date.now() };
  await setBlobData(`chat/${divisi}/${Date.now()}.json`, msg);

  return NextResponse.json({ success: true });
}