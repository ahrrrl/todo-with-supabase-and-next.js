'use client';

import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SubmitButton } from '../submit-button';
import { useActionState, useEffect } from 'react';
import { signInAction } from '@/app/actions';
import { TSignInForm, useFormValidate } from './useFormVaildate';
import { signInSchema } from '@/zod/schema';
import { ErrorMessage } from './ErrorMessage';
import toast from 'react-hot-toast';
import { AUTH_ROUTES } from '@/constant/routes';

export function LoginForm() {
  const [state, action, isPanding] = useActionState(signInAction, undefined);
  const { errors, validateField } = useFormValidate<TSignInForm>(signInSchema);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (state?.errorMessage) {
      toast.error(state.errorMessage);
    }
  }, [state]);

  return (
    <form className='flex flex-col max-w-[500px] w-full px-4 py-8 mb-24'>
      <h1 className='text-2xl font-medium'>로그인</h1>
      <p className='text-sm text-foreground'>
        계정이 없으신가요?{' '}
        <Link
          className='text-foreground font-medium underline'
          href={AUTH_ROUTES.SIGN_UP}
        >
          가입하기
        </Link>
      </p>
      <div className='flex flex-col gap-6 mt-8'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' />
          {errors?.email && <ErrorMessage message={errors?.email[0]} />}
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='password'>Password</Label>
            <Link
              className='text-xs text-foreground underline'
              href='/forgot-password'
            >
              비밀번호를 잊어버리셨나요?
            </Link>
          </div>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호를 입력해주세요'
            onChange={handleChange}
          />
          {errors?.password && <ErrorMessage message={errors?.password[0]} />}
        </div>

        <SubmitButton
          disabled={isPanding}
          pendingText='Signing In...'
          formAction={action}
        >
          Sign in
        </SubmitButton>
      </div>
    </form>
  );
}
