'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUserPlus, FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function SetupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        router.push('/login?setup=success');
      } else {
        const data = await res.json();
        setError(data.error || 'Gagal membuat akun ketua.');
      }
    } catch {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-himmah-900 via-himmah-800 to-himmah-900 p-4 relative overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-himmah-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-himmah-500 to-himmah-700 rounded-2xl flex items-center justify-center shadow-xl shadow-himmah-500/20 mb-6"
          >
            <FiUserPlus className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Setup Akun Ketua</h1>
          <p className="text-gray-400 mt-2">Buat akun administrator pertama</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-himmah-800/60 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-himmah-700/30"
        >
          <form onSubmit={handleSetup} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Ketua"
                className="w-full pl-10 pr-4 py-3.5 bg-himmah-900/50 border border-himmah-700/50 rounded-xl text-white placeholder-gray-500 outline-none focus:border-himmah-500 focus:ring-2 focus:ring-himmah-500/20 transition"
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (untuk login)"
                className="w-full pl-10 pr-4 py-3.5 bg-himmah-900/50 border border-himmah-700/50 rounded-xl text-white placeholder-gray-500 outline-none focus:border-himmah-500 focus:ring-2 focus:ring-himmah-500/20 transition"
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3.5 bg-himmah-900/50 border border-himmah-700/50 rounded-xl text-white placeholder-gray-500 outline-none focus:border-himmah-500 focus:ring-2 focus:ring-himmah-500/20 transition"
                required
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3"
              >
                {error}
              </motion.p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-himmah-500 to-himmah-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-himmah-500/20 transition disabled:opacity-70"
            >
              {loading ? 'Membuat...' : 'Buat Akun Ketua'}
            </motion.button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <FiArrowLeft /> Kembali ke login
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}