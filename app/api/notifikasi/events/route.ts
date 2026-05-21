import { getBlobData } from '@/lib/blob-helpers';

export async function GET(req: Request) {
  const stream = new ReadableStream({
    async start(controller) {
      const send = async () => {
        const notifs = await getBlobData<any[]>('notif_ketua.json');
        controller.enqueue(`data: ${JSON.stringify(notifs || [])}\n\n`);
      };
      send();
      const interval = setInterval(send, 3000);
      req.signal.addEventListener('abort', () => clearInterval(interval));
    }
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' }
  });
}