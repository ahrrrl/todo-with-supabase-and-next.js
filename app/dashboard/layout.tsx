import { Header } from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full min-h-screen flex'>
      <div className='min-h-screen sm:block hidden w-64'>
        <Sidebar />
      </div>
      <div className='w-full h-full flex-1'>
        <Header />
        <div className='h-full w-full'>
          <div className='p-4 max-w-[800px] max-h-[500px] mx-auto'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
