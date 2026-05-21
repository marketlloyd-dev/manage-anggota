'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LaporanPage() {
  const [laporan, setLaporan] = useState<any[]>([]);
  const [divisi, setDivisi] = useState('penguatan_ideologi');
  const [isi, setIsi] = useState('');

  useEffect(() => { fetch('/api/laporan').then(r => r.json()).then(setLaporan); }, []);

  const submit = async () => {
    await fetch('/api/laporan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ divisi, isi }),
    });
    setIsi('');
    fetch('/api/laporan').then(r => r.json()).then(setLaporan);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-bold mb-6">Laporan Kegiatan Divisi</h2>
      <div className="flex gap-4 mb-6">
        <select value={divisi} onChange={e => setDivisi(e.target.value)} className="bg-himmah-700 px-4 py-2 rounded">
          <option value="penguatan_ideologi">Penguatan Ideologi</option>
          <option value="kehimmawatian">Kehimmawatian</option>
          <option value="teknologi_informasi">Teknologi Informasi</option>
          <option value="ekonomi_bisnis">Ekonomi Bisnis</option>
          <option value="penelitian_civil_society">Penelitian Civil Society</option>
        </select>
        <textarea value={isi} onChange={e => setIsi(e.target.value)} className="bg-himmah-700 px-4 py-2 rounded flex-1" />
        <button onClick={submit} className="bg-himmah-500 px-6 py-2 rounded font-bold">Kirim</button>
      </div>
      <div className="space-y-4">
        {laporan.map((l, i) => (
          <div key={i} className="bg-himmah-800 p-4 rounded">
            <p className="text-sm text-gray-400">{l.divisi} - {l.penulis}</p>
            <p>{l.isi}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}