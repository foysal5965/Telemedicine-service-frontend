'use client';
import DashboardDrawer from '@/components/dashboard/DashboardDrawer';
import { isLoggedIn } from '@/services/authService';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   if (!isLoggedIn()) {
      return router.push('/login');
   }
   return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;
