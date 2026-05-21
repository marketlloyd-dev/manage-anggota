'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatBox({ divisi }: { divisi: string }) {
  const [messages, setMessages] = useState<{ user: string; text: string; timestamp: number }[]>([]);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const evtSource = new EventSource(`/api/chat/${divisi}/events`);
    evtSource.onmessage = (e) => {
      const newMsgs = JSON.parse(e.data);
      setMessages(prev => [...prev, ...newMsgs]);
    };
    return () => evtSource.close();
  }, [divisi]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!text.trim()) return;
    await fetch(`/api/chat/${divisi}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: 'Anda', text }),
    });
    setText('');
  };

  return (
    <div className="flex flex-col h-full bg-himmah-800 rounded-xl p-4">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`p-2 rounded-lg max-w-[70%] ${msg.user === 'Anda' ? 'bg-himmah-500 self-end' : 'bg-himmah-700'}`}>
            <span className="text-xs text-gray-300">{msg.user}</span>
            <p>{msg.text}</p>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
          className="flex-1 bg-himmah-700 px-4 py-2 rounded-lg outline-none" placeholder="Ketik pesan..." />
        <button onClick={send} className="bg-himmah-500 px-4 py-2 rounded-lg">Kirim</button>
      </div>
    </div>
  );
}