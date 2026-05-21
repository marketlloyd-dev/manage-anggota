import { put, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Coba tulis file test
    const blob = await put('test-debug.json', JSON.stringify({ status: 'ok', time: Date.now() }), {
      access: 'public',
      contentType: 'application/json',
    });
    // Coba list
    const { blobs } = await list({ prefix: 'test-debug.json' });

    return NextResponse.json({
      success: true,
      blobUrl: blob.url,
      listResult: blobs.length > 0 ? 'found' : 'not found',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}