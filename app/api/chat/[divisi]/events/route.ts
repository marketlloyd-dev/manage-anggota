import { lrange } from '@/lib/data-helpers';
export const dynamic = 'force-dynamic';

export async function GET(req: Request, context: { params: Promise<{ divisi: string }> }) {
  const { divisi } = await context.params;
  const stream = new ReadableStream({
    async start(controller) {
      let lastTimestamp = 0;
      const send = async () => {
        const raw = await lrange(`chat:${divisi}`, 0, 50);
        const messages = raw.map((m) => JSON.parse(m)).reverse();
        const newMsgs = messages.filter((m: any) => m.timestamp > lastTimestamp);
        if (newMsgs.length > 0) {
          controller.enqueue(`data: ${JSON.stringify(newMsgs)}\n\n`);
          lastTimestamp = newMsgs[newMsgs.length - 1].timestamp;
        }
      };
      send();
      const interval = setInterval(send, 2000);
      req.signal.addEventListener('abort', () => clearInterval(interval));
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
  });
}