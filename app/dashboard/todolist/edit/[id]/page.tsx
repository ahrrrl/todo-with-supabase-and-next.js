import { TodoEditor } from '@/components/todolist/TodoEditor';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('todolist')
    .select('*')
    .eq('id', Number(id))
    .single();

  if (!data) return notFound();

  return <TodoEditor data={data} />;
}
