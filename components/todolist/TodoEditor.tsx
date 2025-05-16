'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import TiptapEditor from './TiptapEditor';
import { useRouter } from 'next/navigation';
import { DASHBOARD_ROUTES } from '@/constant/routes';
import { editTodo } from '@/app/actions/todos';
import { Database } from '@/database.types';
import toast from 'react-hot-toast';

interface Props {
  data: Todo;
}

type Todo = Database['public']['Tables']['todolist']['Row'];

export function TodoEditor({ data }: Props) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(
    data.content || { type: 'doc', content: [] }
  );
  const router = useRouter();

  const handleSave = async () => {
    const { error } = await editTodo({ title, content, id: data.id });
    if (!error) {
      toast.success('수정되었습니다.');
      router.push(`${DASHBOARD_ROUTES.VIEW_TODO}/${data.id}`);
    }
  };

  return (
    <>
      <input
        className='h-[56px] text-xl font-bold w-full mb-4 border p-2'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={'제목을 입력하세요'}
      />
      <TiptapEditor content={content} onChange={setContent} />
      <Button onClick={handleSave} className='mt-4 px-4 py-2  rounded'>
        저장하기
      </Button>
    </>
  );
}
