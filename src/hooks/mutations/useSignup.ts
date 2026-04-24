'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import type { SignupRequest } from '@/types/auth';

interface UseSignupReturn {
  signup: (data: SignupRequest) => Promise<void>;
  isPending: boolean;
  error: string | null;
}

export const useSignup = (): UseSignupReturn => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signup = async (data: SignupRequest) => {
    setIsPending(true);
    setError(null);

    try {
      await authApi.signup(data);
      router.push('/login');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  return { signup, isPending, error };
};
