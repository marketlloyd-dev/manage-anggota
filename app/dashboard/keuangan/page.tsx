'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function KeuanganPage() {
  const [data, setData] = useState<any[]>([]);
  const [jumlah, setJumlah] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const fetchData = () => fetch('/api/keuangan').then(r => r.json()).then(setData);
  useEffect(() => { fetchData(); }, []);

  const addEntry = async () => {
    await fetch('/api/keuangan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jumlah: Number(jumlah), keterangan }),
    });
    setJumlah(''); setKeterangan('');
    fetchData();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-bold mb-6">Keuangan Kas</h2>
      <div className="flex gap-4 mb-6">
        <input type="number" value={jumlah} onChange={e => setJumlah(e.target.value)} className="bg-himmah-700 px-4 py-2 rounded" placeholder="Jumlah" />
        <input value={keterangan} onChange={e => setKeterangan(e.target.value)} className="bg-himmah-700 px-4 py-2 rounded flex-1" placeholder="Keterangan" />
        <button onClick={addEntry} className="bg-himmah-500 px-6 py-2 rounded font-bold">Tambah</button>
      </div>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="bg-himmah-800 p-3 rounded flex justify-between">
            <span>{item.keterangan}</span>
            <span className={item.jumlah >= 0 ? 'text-green-400' : 'text-red-400'}>Rp{item.jumlah}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}