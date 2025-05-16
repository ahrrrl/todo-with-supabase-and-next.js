import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get('offset') || 0);
  const limit = Number(searchParams.get('limit') || 20);

  const supabase = await createClient();
  const { data } = await supabase
    .from('todolist')
    .select('*')
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1);

  return Response.json(data || []);
}