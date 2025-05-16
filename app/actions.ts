'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signInSchema } from '@/zod/schema';
import { AUTH_ROUTES, DASHBOARD_ROUTE } from '@/constant/routes';
import { revalidatePath } from 'next/cache';

export const signUpAction = async (_: unknown, formData: FormData) => {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!data.email || !data.password) {
    return { errorMessage: '이메일과 비밀번호를 입력해주세요.' };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return { errorMessage: error.message };
  } else {
    return { successMessage: '이메일을 확인하여 인증해주세요.' };
  }
};

export const signInAction = async (_: unknown, formData: FormData) => {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const parsed = signInSchema.safeParse(data);
  if (!parsed.success) {
    const errorMessage = parsed.error.issues[0].message;
    return { errorMessage };
  }

  const supabase = await createClient();

  const { data: userData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { errorMessage: error?.message };
  }

  return { user: userData.user };
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match'
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password update failed'
    );
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect(AUTH_ROUTES.SIGN_IN);
};
