import { signOutAction } from '@/app/actions';
import Link from 'next/link';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import { AUTH_ROUTES } from '@/constant/routes';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type='submit' variant={'outline'}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className='flex gap-2'>
      <Button asChild size='sm' variant={'outline'}>
        <Link href={AUTH_ROUTES.SIGN_IN}>Sign in</Link>
      </Button>
      <Button asChild size='sm' variant={'default'}>
        <Link href={AUTH_ROUTES.SIGN_UP}>Sign up</Link>
      </Button>
    </div>
  );
}
