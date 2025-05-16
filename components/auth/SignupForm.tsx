'use client';

import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SubmitButton } from '../submit-button';
import { use, useActionState, useEffect } from 'react';
import { TSignInForm, useFormValidate } from './useFormVaildate';
import { ErrorMessage } from './ErrorMessage';
import { signUpAction } from '@/app/actions';
import { signUpSchema } from '@/zod/schema';
import toast from 'react-hot-toast';
import { AUTH_ROUTES } from '@/constant/routes';

export function SignupForm() {
  const [state, action, isPanding] = useActionState(signUpAction, undefined);
  const { errors, validateField } = useFormValidate<TSignInForm>(signUpSchema);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (state?.errorMessage) {
      toast.error(state.errorMessage);
    }
    if (state?.successMessage) {
      toast.success(state.successMessage);
    }
  }, [state]);

  return (
    <>
      <form className='flex flex-col max-w-[500px] w-full px-4 py-8 mb-24'>
        <h1 className='text-2xl font-medium'>회원가입</h1>
        <p className='text-sm text text-foreground'>
          이미 계정이 있으신가요?{' '}
          <Link
            className='text-primary font-medium underline'
            href={AUTH_ROUTES.SIGN_IN}
          >
            로그인하기
          </Link>
        </p>
        <div className='flex flex-col gap-6 mt-8'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              name='email'
              placeholder='you@example.com'
              onChange={handleChange}
            />
            {errors?.email && <ErrorMessage message={errors?.email[0]} />}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              name='password'
              placeholder='Your password'
              onChange={handleChange}
            />
            {errors?.password && <ErrorMessage message={errors?.password[0]} />}
          </div>
          <SubmitButton
            formAction={action}
            disabled={isPanding}
            pendingText='Signing up...'
          >
            Sign up
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
