'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import TiptapEditor from './TiptapEditor';
import { useRouter } from 'next/navigation';
import { DASHBOARD_ROUTES } from '@/constant/routes';
import { editTodo } from '@/app/actions/todos';

interface Props {
  data: {
    content: any | null;
    created_at: string | null;
    description: string | null;
    due_date: string | null;
    id: number;
    priority: string | null;
    status: string | null;
    title: string;
    updated_at: string | null;
    user_id: string | null;
  };
}

export function TodoEditor({ data }: Props) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(
    data.content || { type: 'doc', content: [] }
  );
  const router = useRouter();

  const handleSave = async () => {
    const { error } = await editTodo({ title, content, id: data.id });
    if (!error) {
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
