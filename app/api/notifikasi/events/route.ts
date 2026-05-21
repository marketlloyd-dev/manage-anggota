import { getData } from '@/lib/data-helpers';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const stream = new ReadableStream({
    async start(controller) {
      const send = async () => {
        const notifs = await getData<any[]>('notif_ketua');
        controller.enqueue(`data: ${JSON.stringify(notifs || [])}\n\n`);
      };
      send();
      const interval = setInterval(send, 3000);
      req.signal.addEventListener('abort', () => clearInterval(interval));
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
  });
}