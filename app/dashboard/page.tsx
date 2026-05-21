'use client';
import { motion } from 'framer-motion';
import {
  FiUsers, FiCalendar, FiDollarSign, FiFileText, FiTrendingUp, FiActivity
} from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function BerandaPage() {
  const [greeting, setGreeting] = useState('Selamat Datang');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Selamat Pagi');
    else if (hour < 18) setGreeting('Selamat Siang');
    else setGreeting('Selamat Malam');
  }, []);

  const stats = [
    { label: 'Total Anggota', value: '-', icon: FiUsers, color: 'from-blue-500/20 to-blue-600/10' },
    { label: 'Kegiatan Bulan Ini', value: '-', icon: FiCalendar, color: 'from-green-500/20 to-green-600/10' },
    { label: 'Saldo Kas', value: 'Rp -', icon: FiDollarSign, color: 'from-yellow-500/20 to-yellow-600/10' },
    { label: 'Laporan Baru', value: '-', icon: FiFileText, color: 'from-purple-500/20 to-purple-600/10' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-himmah-700 via-himmah-600 to-himmah-500 p-8 md:p-10 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center">
            <FiActivity className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {greeting}, Ketua!
            </h1>
            <p className="text-gray-200 mt-1">
              Komisariat STMIK Syaikh Zainuddin NW Anjani
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} border border-himmah-700/30 backdrop-blur-sm shadow-xl`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-himmah-800/50 backdrop-blur-xl p-6 rounded-2xl border border-himmah-700/30"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FiTrendingUp /> Akses Cepat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Tambah Anggota', href: '/dashboard/anggota' },
            { label: 'Buat Rapat', href: '/dashboard/kalender' },
            { label: 'Catat Keuangan', href: '/dashboard/keuangan' },
            { label: 'Buat Laporan', href: '/dashboard/laporan' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="p-4 bg-himmah-700/30 hover:bg-himmah-700/50 rounded-xl text-center text-gray-200 hover:text-white transition font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}