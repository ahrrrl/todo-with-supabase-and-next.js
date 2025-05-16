import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .email('이메일 형식으로 작성해주세요')
    .min(1, '이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자리 이상이어야 합니다'),
});

export const signUpSchema = signInSchema;
