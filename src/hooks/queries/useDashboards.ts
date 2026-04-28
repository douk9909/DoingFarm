'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { dashboardApi } from '@/lib/api/dashboard';
import type { Dashboard } from '@/types/dashboard';

interface UseDashboardsReturn {
  dashboards: Dashboard[];
  isLoading: boolean;
  error: string | null;
  refetchDashboards: () => Promise<void>;
}

// refreshKey가 바뀌면 사이드바 대시보드 목록 다시 조회
export const useDashboards = (refreshKey = 0): UseDashboardsReturn => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchDashboards = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await dashboardApi.getList({
        // 사이드바에서는 첫 페이지 목록만 사용
        navigationMethod: 'pagination',
        page: 1,
        size: 50,
      });

      setDashboards(res.data.dashboards);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetchDashboardsRef = useRef(refetchDashboards);
  useEffect(() => {
    refetchDashboardsRef.current = refetchDashboards;
  }, [refetchDashboards]);

  useEffect(() => {
    // 생성 성공 후 refreshKey가 증가하면 최신 목록으로 갱신
    refetchDashboardsRef.current();
  }, [refreshKey]);

  return { dashboards, isLoading, error, refetchDashboards };
};
