import Link from 'next/link';
import NextLogo from './next-logo';
import SupabaseLogo from './supabase-logo';
import { Button } from './ui/button';
import { AUTH_ROUTES } from '@/constant/routes';

export default function Hero() {
  return (
    <div className='flex flex-col gap-16 items-center'>
      <div className='flex gap-8 justify-center items-center'>
        <a
          href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
          target='_blank'
          rel='noreferrer'
        >
          <SupabaseLogo />
        </a>
        <span className='border-l rotate-45 h-6' />
        <a href='https://nextjs.org/' target='_blank' rel='noreferrer'>
          <NextLogo />
        </a>
      </div>
      <p className='text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center'>
        Todolist with{' '}
        <a
          href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
          target='_blank'
          className='font-bold hover:underline'
          rel='noreferrer'
        >
          Supabase
        </a>{' '}
        and{' '}
        <a
          href='https://nextjs.org/'
          target='_blank'
          className='font-bold hover:underline'
          rel='noreferrer'
        >
          Next.js
        </a>
      </p>
      <div className='flex gap-4'>
        <Link href={AUTH_ROUTES.SIGN_IN}>
          <Button>지금 시작하기</Button>
        </Link>
        <Link href={AUTH_ROUTES.SIGN_UP}>
          {' '}
          <Button>회원 가입하기</Button>
        </Link>
      </div>
      <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8' />
    </div>
  );
}
