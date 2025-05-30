import { forgotPasswordAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/auth/ForgotPasswordMesaage';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AUTH_ROUTES } from '@/constant/routes';
import Link from 'next/link';

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className='flex flex-col max-w-[500px] w-full px-4 py-8 mb-24'>
        <div>
          <h1 className='text-2xl font-medium'>Reset Password</h1>
          <p className='text-sm text-secondary-foreground'>
            Already have an account?{' '}
            <Link className='text-primary underline' href={AUTH_ROUTES.SIGN_IN}>
              Sign in
            </Link>
          </p>
        </div>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' required />
          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
