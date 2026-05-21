'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  FiUsers, FiCalendar, FiDollarSign, FiFileText,
  FiCheckSquare, FiMessageSquare, FiHome, FiLogOut, FiMenu, FiX
} from 'react-icons/fi';
import { useState } from 'react';
import NotificationBell from './NotificationBell';

const links = [
  { href: '/dashboard', label: 'Beranda', icon: FiHome },
  { href: '/dashboard/anggota', label: 'Anggota', icon: FiUsers, roles: ['ketua', 'sekretaris'] },
  { href: '/dashboard/kalender', label: 'Kalender', icon: FiCalendar },
  { href: '/dashboard/keuangan', label: 'Keuangan', icon: FiDollarSign, roles: ['ketua', 'bendahara'] },
  { href: '/dashboard/laporan', label: 'Laporan', icon: FiFileText },
  { href: '/dashboard/absensi', label: 'Absensi', icon: FiCheckSquare },
];

const divisiChat = [
  { id: 'penguatan_ideologi', nama: 'Ideologi' },
  { id: 'kehimmawatian', nama: 'Kehimmawatian' },
  { id: 'teknologi_informasi', nama: 'Teknologi' },
  { id: 'ekonomi_bisnis', nama: 'Ekonomi' },
  { id: 'penelitian_civil_society', nama: 'Penelitian' },
];

export default function Sidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const filteredLinks = links.filter(link => !link.roles || link.roles.includes(userRole));

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-himmah-800 p-2 rounded-xl shadow-lg text-white"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        className="fixed lg:static inset-y-0 left-0 z-40 w-72 bg-himmah-800/95 backdrop-blur-2xl border-r border-himmah-700/50 p-5 flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-himmah-500 to-himmah-700 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Himmah NW</h2>
              <p className="text-xs text-gray-400">Komisariat STMIK</p>
            </div>
          </div>
          <NotificationBell />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {filteredLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? 'bg-himmah-500/20 text-himmah-500 border-l-4 border-himmah-500'
                      : 'text-gray-300 hover:bg-himmah-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="flex-shrink-0" size={18} /> {link.label}
                </motion.div>
              </Link>
            );
          })}

          {/* Divider & Chat Divisi */}
          <div className="pt-4 mt-4 border-t border-himmah-700/50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              Chat Divisi
            </p>
            {divisiChat.map(d => (
              <Link key={d.id} href={`/dashboard/chat/${d.id}`} onClick={() => setOpen(false)}>
                <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-300 hover:bg-himmah-700/50 hover:text-white transition ${
                  pathname.includes(`/dashboard/chat/${d.id}`) ? 'bg-himmah-500/10 text-himmah-500' : ''
                }`}>
                  <FiMessageSquare size={14} /> {d.nama}
                </div>
              </Link>
            ))}
          </div>
        </nav>

        <Link
          href="/api/auth/logout"
          className="flex items-center gap-3 mt-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-himmah-700/50 rounded-xl transition"
        >
          <FiLogOut /> Keluar
        </Link>
      </motion.aside>
    </>
  );
}