'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FiUsers, FiCalendar, FiDollarSign, FiFileText, FiCheckSquare, FiMessageSquare } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import NotificationBell from './NotificationBell';

const links = [
  { href: '/dashboard', label: 'Beranda', icon: FiUsers },
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const filteredLinks = links.filter(link => !link.roles || link.roles.includes(userRole));

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed left-0 top-0 h-full w-64 bg-himmah-800 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-himmah-500">Himmah NW</h2>
        <NotificationBell />
      </div>
      <nav className="flex-1 space-y-2">
        {filteredLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                ${pathname === link.href ? 'bg-himmah-700 text-himmah-500' : 'hover:bg-himmah-700 text-gray-300'}`}>
                <Icon /> {link.label}
              </div>
            </Link>
          );
        })}
        <div className="pt-4 border-t border-himmah-700">
          <p className="text-xs text-gray-400 mb-2">Chat Divisi</p>
          {divisiChat.map(d => (
            <Link key={d.id} href={`/dashboard/chat/${d.id}`}>
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-himmah-700 text-gray-300">
                <FiMessageSquare /> {d.nama}
              </div>
            </Link>
          ))}
        </div>
      </nav>
      <Link href="/api/auth/logout" className="mt-auto text-sm text-gray-400 hover:text-white">
        Logout
      </Link>
    </motion.aside>
  );
}