import { getUserFromToken } from '@/lib/auth';
export async function GET() {
  const user = await getUserFromToken();
  return Response.json(user || {});
}