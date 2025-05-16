import TiptapEditor from '@/components/todolist/TiptapEditor';
import { Button } from '@/components/ui/button';
import { DASHBOARD_ROUTES } from '@/constant/routes';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ViewPage({
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

  return (
    <>
      <h1 className='h-[56px] text-2xl font-bold mb-4 flex items-center'>
        {data.title}
      </h1>
      <TiptapEditor content={data.content} isEditable={false} />
      <Link href={`${DASHBOARD_ROUTES.EDIT_TODO}/${data.id}`}>
        <Button className='mt-4 px-4 py-2 rounded'>수정하기</Button>
      </Link>
    </>
  );
}
