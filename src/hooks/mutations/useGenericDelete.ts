'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';

import type { ApiError } from '@/lib/api/client';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';

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
  const { notifyDashboardCreated } = useDashboardCreateModal();

  const handleDelete = useCallback(
    async ({ deleteAction, successMessage, onSuccess }: UseDeleteActionParams) => {
      try {
        setIsPending(true);
        setError(null);

        await deleteAction();
        notifyDashboardCreated();

        if (successMessage) alert(successMessage); // Todo: 토스트로 변경
        if (onSuccess) onSuccess();
      } catch (error) {
        setError(getDeleteErrorMessage(error));
      } finally {
        setIsPending(false);
      }
    },
    [notifyDashboardCreated],
  );

  return { isPending, handleDelete, error };
}
