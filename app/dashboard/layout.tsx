import { getUserFromToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromToken();
  if (!user) redirect('/login');

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={user.role} />
      <div className="flex-1 p-6 lg:p-10 overflow-x-auto bg-gradient-to-br from-himmah-900 to-himmah-800">
        {children}
      </div>
    </div>
  );
}