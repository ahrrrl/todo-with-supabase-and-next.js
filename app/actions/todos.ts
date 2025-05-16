'use server';

import { DASHBOARD_ROUTE } from "@/constant/routes";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';


export async function createTodo({ title, content, user_id }: { title: string, content: any, user_id: string }) {
  const supabase = await createClient();
  const { data } = await supabase.from('todolist').insert([{ title, content, user_id }]).select().single();
  revalidatePath(DASHBOARD_ROUTE); 
  return data
}

export async function editTodo({ title, content, id }: {title: string, content: any, id: number}) {
  const supabase =  await createClient();
  const { error } = await supabase.from('todolist').update({ title, content }).eq('id', id)
  revalidatePath(DASHBOARD_ROUTE);
  if (error) return { error }
  return { success: true } 
  // 예를 들어서 여기 return 이 없으면 return 값을 내뱉는 경우가 없는게 생김
  // 이 함수를 사용할 때 const { error } = await editTodo({ title, content, id }) 이렇게 사용하려고 했는데
  // 타입에러가남 { error: PostgrestError; } | undefined' 형식에 'error' 속성이 없습니다.ts(2339)
}

export async function deleteTodo(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from('todolist').delete().eq('id', id);
  revalidatePath(DASHBOARD_ROUTE);
  if (error) return { error }
  return { success: true } 
}