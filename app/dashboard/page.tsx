'use client';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiDollarSign, FiFileText, FiCheckSquare } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const cards = [
  { label: 'Total Anggota', icon: FiUsers, value: '...', color: 'from-blue-500/20 to-blue-600/10' },
  { label: 'Kegiatan Bulan Ini', icon: FiCalendar, value: '...', color: 'from-green-500/20 to-green-600/10' },
  { label: 'Saldo Kas', icon: FiDollarSign, value: '...', color: 'from-yellow-500/20 to-yellow-600/10' },
  { label: 'Laporan Baru', icon: FiFileText, value: '...', color: 'from-purple-500/20 to-purple-600/10' },
  { label: 'Kehadiran Rapat', icon: FiCheckSquare, value: '...', color: 'from-red-500/20 to-red-600/10' },
];

export default function Beranda() {
  const [welcome, setWelcome] = useState(false);
  useEffect(() => { setWelcome(true); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-himmah-700 to-himmah-500 p-8 md:p-10"
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Selamat Datang di Himmah NW</h1>
          <p className="mt-2 text-gray-200">Komisariat STMIK Syaikh Zainuddin NW Anjani</p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute right-20 top-5 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} border border-himmah-700/50 backdrop-blur-sm`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">{card.label}</p>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}