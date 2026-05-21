import { setBlobData, getBlobData } from '@/lib/blob-helpers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Nama, email, dan password wajib diisi' }, { status: 400 });
    }

    // Cek apakah email sudah terdaftar
    const existing = await getBlobData(`users/${email}.json`);
    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 });
    }

    const user = {
      name,
      email,
      password, // sebaiknya di-hash nanti, untuk sekarang plaintext
      role: 'ketua',
      divisi: '',
    };

    // Simpan user
    await setBlobData(`users/${email}.json`, user);

    // Inisialisasi daftar divisi jika belum ada
    const divisi = [
      { id: 'penguatan_ideologi', nama: 'Penguatan Ideologi' },
      { id: 'kehimmawatian', nama: 'Kehimmawatian' },
      { id: 'teknologi_informasi', nama: 'Teknologi Informasi & Media Sosial' },
      { id: 'ekonomi_bisnis', nama: 'Pemberdayaan Ekonomi & Bisnis' },
      { id: 'penelitian_civil_society', nama: 'Penelitian & Pemberdayaan Civil Society' },
    ];
    await setBlobData('divisi.json', divisi);

    return NextResponse.json({ success: true, message: 'Akun ketua berhasil dibuat.' });
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: `Gagal membuat akun: ${error.message || 'Server error'}` },
      { status: 500 }
    );
  }
}