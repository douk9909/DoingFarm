'use client';

import { useState } from 'react';
import axios from 'axios';
import { dashboardApi } from '@/lib/api/dashboard';
import type { ApiError } from '@/lib/api/client';
import { DASHBOARD_COLOR_HEX_MAP, type DashboardColor } from '@/lib/constants/color';
import type { Dashboard } from '@/types/dashboard';
import { showToast } from '@/lib/utils/toast';

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
    // 제목 유효성 검사
    if (!title.trim()) {
      showToast.error('대시보드 이름을 입력해주세요.');
      return null;
    }

    setIsPending(true);
    setError(null);

    try {
      const res = await dashboardApi.create({
        title: title.trim(),
        // API 요청 형식에 맞게 CSS 토큰을 Hex 코드로 변환
        color: DASHBOARD_COLOR_HEX_MAP[color],
      });

      // 성공 토스트
      showToast.success('대시보드가 생성되었습니다.');

      return res.data;
    } catch (err) {
      const message = getCreateDashboardErrorMessage(err);

      setError(message);

      // 실패 토스트
      showToast.error(message);

      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { createDashboard, isPending, error };
};