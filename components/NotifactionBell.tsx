'use client';
import { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function NotificationBell() {
  const [notifCount, setNotifCount] = useState(0);
  useEffect(() => {
    const evtSource = new EventSource('/api/notifikasi/events');
    evtSource.onmessage = (e) => {
      const notifs = JSON.parse(e.data);
      const unread = notifs.filter((n: any) => !n.dibaca).length;
      setNotifCount(unread);
    };
    return () => evtSource.close();
  }, []);

  return (
    <motion.div animate={notifCount > 0 ? { rotate: [0, 10, -10, 0] } : {}} transition={{ repeat: Infinity, duration: 1 }}
      className="relative cursor-pointer">
      <FiBell size={20} />
      {notifCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {notifCount}
        </span>
      )}
    </motion.div>
  );
}