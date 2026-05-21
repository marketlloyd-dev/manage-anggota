import { setBlobData, getBlobData } from '@/lib/blob-helpers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    const exists = await getBlobData(`users/${email}.json`);
    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    const user = {
      name: name || 'Ketua Umum',
      email,
      password,
      role: 'ketua',
      divisi: '',
    };
    await setBlobData(`users/${email}.json`, user);

    // Inisialisasi divisi jika belum ada
    const divisi = await getBlobData('divisi.json');
    if (!divisi) {
      await setBlobData('divisi.json', [
        { id: 'penguatan_ideologi', nama: 'Penguatan Ideologi' },
        { id: 'kehimmawatian', nama: 'Kehimmawatian' },
        { id: 'teknologi_informasi', nama: 'Teknologi Informasi & Media Sosial' },
        { id: 'ekonomi_bisnis', nama: 'Pemberdayaan Ekonomi & Bisnis' },
        { id: 'penelitian_civil_society', nama: 'Penelitian & Pemberdayaan Civil Society' },
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}