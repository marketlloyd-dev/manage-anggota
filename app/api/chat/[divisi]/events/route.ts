// app/api/chat/[divisi]/events/route.ts
import { listBlobData } from '@/lib/blob-helpers';

export async function GET(req: Request, { params }: { params: { divisi: string } }) {
  const stream = new ReadableStream({
    async start(controller) {
      let lastTimestamp = 0;
      const sendMessages = async () => {
        const msgs = await listBlobData<any>(`chat/${params.divisi}/`);
        const newMsgs = msgs
          .filter((m: any) => m.timestamp > lastTimestamp)
          .sort((a: any, b: any) => a.timestamp - b.timestamp);
        if (newMsgs.length > 0) {
          controller.enqueue(`data: ${JSON.stringify(newMsgs)}\n\n`);
          lastTimestamp = newMsgs[newMsgs.length - 1].timestamp;
        }
      };
      sendMessages();
      const interval = setInterval(sendMessages, 2000);
      req.signal.addEventListener('abort', () => clearInterval(interval));
    }
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' }
  });
}