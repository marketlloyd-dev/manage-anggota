'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSetup = async () => {
    const res = await fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      alert('Admin ketua berhasil dibuat. Silakan login.');
      router.push('/login');
    } else {
      alert('Setup gagal, mungkin sudah ada user.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-himmah-900">
      <div className="bg-himmah-800 p-8 rounded-2xl w-96">
        <h1 className="text-2xl font-bold text-himmah-500 mb-6">Setup Admin Ketua</h1>
        <input
          type="email" placeholder="Email admin" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-himmah-700 rounded-lg outline-none"
        />
        <input
          type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 bg-himmah-700 rounded-lg outline-none"
        />
        <button onClick={handleSetup} className="w-full py-3 bg-himmah-500 rounded-lg font-bold">
          Buat Ketua
        </button>
      </div>
    </div>
  );
}