'use client';

import { useState } from 'react';
import { dashboardApi } from '@/lib/api/dashboard';
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

export const useCreateDashboard = (): UseCreateDashboardReturn => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDashboard = async ({ title, color }: CreateDashboardData) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await dashboardApi.create({
        title,
        // Swagger 요청 형식에 맞춰 CSS 토큰을 Hex 코드로 변환
        color: DASHBOARD_COLOR_HEX_MAP[color],
      });

      return res.data;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { createDashboard, isPending, error };
};
