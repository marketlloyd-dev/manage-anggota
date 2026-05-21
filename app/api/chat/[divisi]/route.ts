import { setBlobData, listBlobData } from '@/lib/blob-helpers';
import { NextResponse } from 'next/server';

/**
 * POST /api/chat/[divisi]
 * Mengirim pesan chat ke room divisi tertentu
 */
export async function POST(
  req: Request,
  { params }: { params: { divisi: string } }
) {
  try {
    const { user, text } = await req.json();
    if (!user || !text) {
      return NextResponse.json({ error: 'user dan text wajib' }, { status: 400 });
    }

    const msg = {
      user,
      text,
      timestamp: Date.now(),
    };

    // Simpan pesan sebagai blob terpisah dengan nama file timestamp (agar urut dan unik)
    await setBlobData(`chat/${params.divisi}/${Date.now()}.json`, msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gagal kirim chat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}