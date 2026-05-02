'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { usePagination } from '@/hooks/queries/usePagination';

interface UseMemberListProps {
  dashboardId: number;
  fetchApi: (
    dashboardId: number,
    params: {
      page: number;
      size: number;
    },
  ) => Promise<any>;
  resourceName: string;
}

export function useMemberList<T>({ dashboardId, fetchApi, resourceName }: UseMemberListProps) {
  const [items, setItems] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isFetching = useRef(false);

  const { page, size, goToNext, goToPrev } = usePagination({
    initialSize: 4,
  });

  const fetchData = useCallback(async () => {
    if (isFetching.current) return;

    try {
      isFetching.current = true;
      setIsLoading(true);

      const response = await fetchApi(dashboardId, { page, size });
      setItems(response.data[resourceName]);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  }, [dashboardId, fetchApi, page, size, resourceName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    items,
    setItems,
    totalCount,
    setTotalCount,
    page,
    goToNext,
    goToPrev,
    isLoading,
    fetchData,
    totalPages: Math.ceil(totalCount / size),
  };
}
