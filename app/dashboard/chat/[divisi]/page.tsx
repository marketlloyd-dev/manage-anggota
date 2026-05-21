'use client';
import { useParams } from 'next/navigation';
import ChatBox from '@/components/ChatBox';

export default function ChatDivisiPage() {
  const { divisi } = useParams();
  return (
    <div className="h-[calc(100vh-8rem)]">
      <ChatBox divisi={divisi as string} />
    </div>
  );
}