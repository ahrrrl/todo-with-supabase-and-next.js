import { DASHBOARD_ROUTE, DASHBOARD_ROUTES } from '@/constant/routes';
import { createClient } from '@/utils/supabase/server';
import { EllipsisVertical, Plus } from 'lucide-react';
import Link from 'next/link';
import { SidebarItem } from './SiderbarItem';

const SIDEBAR_ITEMS = [
  {
    title: '새로 추가하기',
    icon: <Plus className='shrink-0' />,
    href: DASHBOARD_ROUTES.CREATE_TODO,
  },
];

export async function Sidebar() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('todolist')
    .select('*')
    .order('updated_at', { ascending: false });
  const formettedData = data?.map((item) => ({
    title: item.title,
    icon: <EllipsisVertical className='shrink-0' />,
    href: `${DASHBOARD_ROUTES.VIEW_TODO}/${item.id}`,
    id: item.id,
  }));
  return (
    <aside className='flex flex-col w-full h-screen bg-gray-800 text-white'>
      <div className='flex items-center justify-center h-16 border-b border-gray-700'>
        <Link href={DASHBOARD_ROUTE}>
          <h1 className='text-xl font-bold'>SupaTodo</h1>
        </Link>
      </div>
      <nav className='flex flex-col p-4 space-y-2'>
        {[...SIDEBAR_ITEMS].map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>
      <nav
        className='flex flex-col p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent
    hover:scrollbar-thumb-gray-400
    custom-scrollbar'
      >
        {[...(formettedData || [])].map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}
