'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { DASHBOARD_ROUTE, DASHBOARD_ROUTES } from '@/constant/routes';
import { deleteTodo } from '@/app/actions/todos';
import toast from 'react-hot-toast';

interface Props {
  title: string;
  icon: React.ReactNode;
  href: string;
  id?: number;
}

export function SidebarItem({ title, icon, href, id }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`${DASHBOARD_ROUTES.EDIT_TODO}/${id}`);
  };

  const handleClickDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await deleteTodo(id!);
    if (!error) {
      toast.success('삭제되었습니다.');
      if (
        pathname === `${DASHBOARD_ROUTES.VIEW_TODO}/${id}` ||
        pathname === `${DASHBOARD_ROUTES.EDIT_TODO}/${id}`
      ) {
        router.push(DASHBOARD_ROUTE);
      }
    }
  };

  return (
    <Link
      href={href}
      className='hover:bg-gray-700 p-2 rounded flex items-center justify-between'
    >
      <span className='truncate'>{title}</span>
      {id ? (
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            {icon}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleClickEdit}>수정</DropdownMenuItem>
            <DropdownMenuItem onClick={handleClickDelete}>
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        icon
      )}
    </Link>
  );
}
