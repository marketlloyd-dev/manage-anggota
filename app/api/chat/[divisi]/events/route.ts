import { kv } from '@vercel/kv';
export async function GET(req: Request, { params }: { params: { divisi: string } }) {
  const stream = new ReadableStream({
    async start(controller) {
      let lastTimestamp = 0;
      const sendMessages = async () => {
        const raw = await kv.lrange(`chat:${params.divisi}`, 0, 50);
        const messages = raw.map((m: string) => JSON.parse(m)).reverse();
        const newMessages = messages.filter((m: any) => m.timestamp > lastTimestamp);
        if (newMessages.length > 0) {
          controller.enqueue(`data: ${JSON.stringify(newMessages)}\n\n`);
          lastTimestamp = messages[0]?.timestamp || 0;
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