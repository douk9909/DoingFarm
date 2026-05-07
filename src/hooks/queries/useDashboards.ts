'use client';

import { useEffect } from 'react';
import { dashboardApi } from '@/lib/api/dashboard';
import type { Dashboard } from '@/types/dashboard';
import { useInfiniteScroll } from './useInfiniteScroll';

export const useDashboards = (refreshKey = 0) => {
  const {
    items: dashboards,
    isLoading,
    error,
    lastItemRef,
    scrollContainerRef,
    reset,
  } = useInfiniteScroll<Dashboard>({
    fetcher: (cursorId) =>
      dashboardApi
        .getList({ navigationMethod: 'infiniteScroll', cursorId, size: 10 })
        .then((res) => ({
          data: res.data.dashboards,
          totalCount: res.data.totalCount,
          nextCursorId: res.data.cursorId ?? null,
        })),
  });

  // refreshKey가 바뀌면 초기화 후 다시 불러옴
  useEffect(() => {
    if (refreshKey === 0) return;
    reset();
  }, [refreshKey, reset]);

  return {
    dashboards,
    isLoading,
    error,
    lastItemRef,
    scrollContainerRef,
    refetchDashboards: reset,
  };
};
