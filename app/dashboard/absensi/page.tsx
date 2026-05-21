'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AbsensiPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => { fetch('/api/absensi').then(r => r.json()).then(setMeetings); }, []);

  const createMeeting = async () => {
    await fetch('/api/absensi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date }),
    });
    setTitle(''); setDate('');
    fetch('/api/absensi').then(r => r.json()).then(setMeetings);
  };

  const hadir = async (meetingId: string) => {
    await fetch('/api/absensi', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingId }),
    });
    fetch('/api/absensi').then(r => r.json()).then(setMeetings);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-bold mb-6">Absensi Rapat</h2>
      <div className="flex gap-4 mb-6">
        <input value={title} onChange={e => setTitle(e.target.value)} className="bg-himmah-700 px-4 py-2 rounded" placeholder="Judul rapat" />
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className="bg-himmah-700 px-4 py-2 rounded" />
        <button onClick={createMeeting} className="bg-himmah-500 px-6 py-2 rounded">Buat Rapat</button>
      </div>
      <div className="space-y-3">
        {meetings.map((m: any) => (
          <div key={m.id} className="bg-himmah-800 p-4 rounded flex justify-between">
            <div>{m.title} - {new Date(m.date).toLocaleString()}</div>
            <button onClick={() => hadir(m.id)} className="bg-green-600 px-4 py-1 rounded text-sm">Hadir</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}