'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';

import type { ApiError } from '@/lib/api/client';
import { showToast } from '@/lib/utils/toast';
interface UseDeleteActionParams {
  deleteAction: () => Promise<any>;
  successMessage?: string;
  onSuccess?: () => void;
}

const getDeleteErrorMessage = (err: unknown) => {
  if (axios.isAxiosError<ApiError>(err)) {
    return err.response?.data?.message ?? err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return '삭제 중 오류가 발생했습니다.';
};

export function useGenericDelete() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = useCallback(
    async ({ deleteAction, successMessage, onSuccess }: UseDeleteActionParams) => {
      try {
        setIsPending(true);
        setError(null);

        await deleteAction();

        if (successMessage) showToast(successMessage);
        if (onSuccess) onSuccess();
      } catch (error) {
        showToast.error(getDeleteErrorMessage(error));
      } finally {
        setIsPending(false);
      }
    },
    [],
  );

  return { isPending, handleDelete, error };
}
