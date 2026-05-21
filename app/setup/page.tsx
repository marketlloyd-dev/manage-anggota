'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUserPlus, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function SetupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      if (res.ok) {
        router.push('/login?setup=success');
      } else {
        const data = await res.json();
        setError(data.error || 'Gagal membuat akun.');
      }
    } catch {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-himmah-900 via-himmah-800 to-himmah-900 p-4">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-himmah-500/10 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-himmah-500 rounded-2xl flex items-center justify-center shadow-lg mb-6"
          >
            <FiUserPlus className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Setup Admin</h1>
          <p className="text-gray-400 mt-2">Buat akun ketua untuk pertama kali</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-himmah-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-himmah-700/50"
        >
          <form onSubmit={handleSetup} className="space-y-5">
            <input
              type="text"
              placeholder="Nama Ketua"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-himmah-900/50 border border-himmah-700 rounded-xl text-white placeholder-gray-400 outline-none focus:border-himmah-500 focus:ring-2 focus:ring-himmah-500/20 transition"
              required
            />
            <input
              type="email"
              placeholder="Email (untuk login)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-himmah-900/50 border border-himmah-700 rounded-xl text-white placeholder-gray-400 outline-none focus:border-himmah-500 focus:ring-2 focus:ring-himmah-500/20 transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-himmah-900/50 border border-himmah-700 rounded-xl text-white placeholder-gray-400 outline-none focus:border-himmah-500 focus:ring-2 focus:ring-himmah-500/20 transition"
              required
            />
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                {error}
              </motion.p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-himmah-500 to-himmah-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-himmah-500/20 transition disabled:opacity-70"
            >
              {loading ? 'Membuat...' : 'Buat Akun Ketua'}
            </motion.button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition">
              <FiArrowLeft /> Kembali ke login
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}