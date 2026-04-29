'use client';

import { useState } from 'react';
import axios from 'axios';
import { dashboardApi } from '@/lib/api/dashboard';
import type { ApiError } from '@/lib/api/client';
import { DASHBOARD_COLOR_HEX_MAP, type DashboardColor } from '@/lib/constants/color';
import type { Dashboard } from '@/types/dashboard';

interface CreateDashboardData {
  title: string;
  color: DashboardColor;
}

interface UseCreateDashboardReturn {
  createDashboard: (data: CreateDashboardData) => Promise<Dashboard | null>;
  isPending: boolean;
  error: string | null;
}

const getCreateDashboardErrorMessage = (err: unknown) => {
  if (axios.isAxiosError<ApiError>(err)) {
    return err.response?.data?.message ?? err.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return '대시보드 생성 중 오류가 발생했습니다.';
};

export const useCreateDashboard = (): UseCreateDashboardReturn => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDashboard = async ({ title, color }: CreateDashboardData) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await dashboardApi.create({
        title,
        // API 요청 형식에 맞게 CSS 토큰을 Hex 코드로 변환
        color: DASHBOARD_COLOR_HEX_MAP[color],
      });

      return res.data;
    } catch (err) {
      setError(getCreateDashboardErrorMessage(err));
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { createDashboard, isPending, error };
};
