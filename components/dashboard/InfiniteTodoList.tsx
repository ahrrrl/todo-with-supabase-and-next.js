'use client';

import { Database } from '@/database.types';
import { useEffect, useRef, useState } from 'react';

type Todo = Database['public']['Tables']['todolist']['Row'];

export default function InfiniteTodoList({
  initialTodos,
}: {
  initialTodos: Todo[];
}) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loader.current) return;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setLoading(true);
          const res = await fetch(
            `/api/todolist?offset=${todos.length}&limit=20`
          );
          const data = await res.json();
          setTodos((prev) => [...prev, ...data]);
          setHasMore(data.length === 20);
          setLoading(false);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [todos, loading, hasMore]);

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className='border-b py-2'>
            {todo.title}
          </li>
        ))}
      </ul>
      <div ref={loader} style={{ height: 40 }} />
      {loading && <div className='text-center py-2'>로딩중...</div>}
      {!hasMore && (
        <div className='text-center py-2 text-gray-400'>
          더 이상 데이터가 없습니다.
        </div>
      )}
    </div>
  );
}
