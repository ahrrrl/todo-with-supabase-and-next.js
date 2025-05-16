import { createClient } from '@/utils/supabase/server';
import InfiniteTodoList from '@/components/dashboard/InfiniteTodoList';

export default async function DashboardPage() {
  const supabase = await createClient();
  // 최초 10개만 서버에서 가져옴
  const { data: initialTodos } = await supabase
    .from('todolist')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(20);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>대시보드</h1>
      <InfiniteTodoList initialTodos={initialTodos || []} />
    </div>
  );
}
