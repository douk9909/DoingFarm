'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { setToken } from '@/lib/utils/storage';
import type { LoginRequest } from '@/types/auth';

interface UseLoginReturn {
  login: (data: LoginRequest) => Promise<void>;
  isPending: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: LoginRequest) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await authApi.login(data);
      setToken(res.data.accessToken);
      router.push('/mydashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
