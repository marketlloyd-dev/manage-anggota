import { setData, getData } from '@/lib/data-helpers';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }
    const exists = await getData(`user:${email}`);
    if (exists) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 });
    }
    const user = { name, email, password, role: 'ketua', divisi: '' };
    await setData(`user:${email}`, user);
    // Inisialisasi divisi (jika belum ada)
    const divisi = [
      { id: 'penguatan_ideologi', nama: 'Penguatan Ideologi' },
      { id: 'kehimmawatian', nama: 'Kehimmawatian' },
      { id: 'teknologi_informasi', nama: 'Teknologi Informasi & Media Sosial' },
      { id: 'ekonomi_bisnis', nama: 'Pemberdayaan Ekonomi & Bisnis' },
      { id: 'penelitian_civil_society', nama: 'Penelitian & Pemberdayaan Civil Society' },
    ];
    await setData('divisi', divisi);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}