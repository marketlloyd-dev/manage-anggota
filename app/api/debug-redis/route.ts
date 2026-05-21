import redis from '@/lib/redis';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await redis.set('test', 'ok');
    const val = await redis.get('test');
    return NextResponse.json({ success: true, value: val });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}