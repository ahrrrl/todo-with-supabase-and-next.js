'use client';

import { createClient } from '@/utils/supabase/client';
import useUserStore from '@/zustand/userStore';
import { useEffect } from 'react';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);
  const supabase = createClient();
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      if (user) {
        setUser(user.data.user);
      }
    };
    getUser();
  }, [supabase, setUser]);
  return <>{children}</>;
}
