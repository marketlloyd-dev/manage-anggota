import { getUserFromToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromToken();
  if (!user) redirect('/login');

  return (
    <div className="flex min-h-screen bg-himmah-900">
      <Sidebar userRole={user.role} />
      <div className="flex-1 lg:ml-0 transition-all duration-300 p-4 lg:p-8 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}