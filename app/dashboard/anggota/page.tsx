'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnggotaPage() {
  const [anggota, setAnggota] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/anggota').then(res => res.json()).then(setAnggota);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold">Anggota Kepengurusan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {anggota.map((a: any, i) => (
          <motion.div key={a.email} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
            className="bg-himmah-800 p-4 rounded-xl">
            <p className="font-semibold">{a.name}</p>
            <p className="text-sm text-gray-400">{a.divisi} | {a.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}