import { getUserFromToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromToken();
  if (!user) redirect('/login');
  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={user.role} />
      <div className="ml-64 flex-1 p-8">{children}</div>
    </div>
  );
}