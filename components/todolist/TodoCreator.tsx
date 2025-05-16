'use client';

import { createTodo } from '@/app/actions/todos';
import TiptapEditor from '@/components/todolist/TiptapEditor';
import { Button } from '@/components/ui/button';
import { DASHBOARD_ROUTES } from '@/constant/routes';
import useUserStore from '@/zustand/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { set } from 'zod';

export function TodoCreator() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any>({ type: 'doc', content: [] });
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async () => {
    setIsSaving(true);
    const data = await createTodo({ title, content, user_id: user!.id });
    setIsSaving(false);
    if (data) {
      toast.success('생성되었습니다.');
      router.push(`${DASHBOARD_ROUTES.VIEW_TODO}/${data.id}`);
    }
  };

  return (
    <>
      <input
        className='text-xl font-bold w-full mb-4 border p-2'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={'제목을 입력하세요'}
      />
      <TiptapEditor content={content} onChange={setContent} />
      <Button
        onClick={handleCreate}
        className='mt-4 px-4 py-2 rounded'
        disabled={isSaving}
      >
        새로 만들기
      </Button>
    </>
  );
}
