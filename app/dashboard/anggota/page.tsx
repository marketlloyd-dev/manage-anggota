'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const divisiOptions = [
  { id: 'penguatan_ideologi', nama: 'Penguatan Ideologi' },
  { id: 'kehimmawatian', nama: 'Kehimmawatian' },
  { id: 'teknologi_informasi', nama: 'Teknologi Informasi & Media Sosial' },
  { id: 'ekonomi_bisnis', nama: 'Pemberdayaan Ekonomi & Bisnis' },
  { id: 'penelitian_civil_society', nama: 'Penelitian & Pemberdayaan Civil Society' },
];

export default function AnggotaPage() {
  const [anggota, setAnggota] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('anggota');
  const [divisi, setDivisi] = useState('');
  const [error, setError] = useState('');

  const fetchAnggota = () => {
    fetch('/api/anggota')
      .then((res) => res.json())
      .then(setAnggota)
      .catch(console.error);
  };

  useEffect(() => {
    fetchAnggota();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/anggota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, divisi }),
    });
    if (res.ok) {
      setName('');
      setEmail('');
      setPassword('');
      setRole('anggota');
      setDivisi('');
      setShowForm(false);
      fetchAnggota();
    } else {
      const data = await res.json();
      setError(data.error || 'Gagal menambah anggota');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Anggota Kepengurusan</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-himmah-500 px-4 py-2 rounded-lg font-semibold hover:bg-himmah-700 transition"
        >
          + Tambah Anggota
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          onSubmit={handleSubmit}
          className="bg-himmah-800 p-6 rounded-xl space-y-4"
        >
          <input
            type="text"
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-himmah-700 rounded-lg outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email (digunakan untuk login)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-himmah-700 rounded-lg outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-himmah-700 rounded-lg outline-none"
            required
          />
          <div className="flex gap-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-1/2 px-4 py-2 bg-himmah-700 rounded-lg outline-none"
            >
              <option value="anggota">Anggota</option>
              <option value="sekretaris">Sekretaris</option>
              <option value="bendahara">Bendahara</option>
              <option value="divisi_kepala">Kepala Divisi</option>
            </select>
            <select
              value={divisi}
              onChange={(e) => setDivisi(e.target.value)}
              className="w-1/2 px-4 py-2 bg-himmah-700 rounded-lg outline-none"
            >
              <option value="">-- Pilih Divisi --</option>
              {divisiOptions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nama}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-himmah-500 rounded-lg font-bold hover:bg-himmah-700 transition"
          >
            Simpan
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {anggota.map((a: any, i) => (
          <motion.div
            key={a.email}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-himmah-800 p-4 rounded-xl"
          >
            <p className="font-semibold">{a.name}</p>
            <p className="text-sm text-gray-400">
              {a.divisi || 'Tanpa divisi'} | {a.role}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}