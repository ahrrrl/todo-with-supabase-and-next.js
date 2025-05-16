import { useState } from 'react';
import { ZodObject, ZodRawShape } from 'zod';

export interface TSignInForm {
  email?: string[];
  password?: string[];
}

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
  const [errors, setErrors] = useState<Partial<T>>();

  const validateField = (name: string, value: string) => {
    setErrors({ ...errors, [name]: undefined });
    const parsed = schema.pick({ [name]: true }).safeParse({ [name]: value });
    if (!parsed.success) {
      setErrors({ ...errors, ...parsed.error.flatten().fieldErrors });
    }
  };

  return { errors, validateField };
}
