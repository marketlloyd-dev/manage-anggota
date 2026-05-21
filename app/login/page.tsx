'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) router.push('/dashboard');
    else alert('Login gagal');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-himmah-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-himmah-800 p-8 rounded-2xl shadow-2xl w-96"
      >
        <h1 className="text-3xl font-bold text-himmah-500 text-center mb-8">Himmah NW</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-himmah-700 text-white rounded-lg outline-none focus:ring-2 ring-himmah-500"
          />
          <input
            type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-himmah-700 text-white rounded-lg outline-none focus:ring-2 ring-himmah-500"
          />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" className="w-full py-3 bg-himmah-500 text-white font-bold rounded-lg">
            Masuk
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}