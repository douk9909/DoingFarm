import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps<T> {
  fetcher: (cursorId?: number) => Promise<{
    data: T[];
    totalCount?: number;
    nextCursorId: number | null;
  }>;
}

export function useInfiniteScroll<T>({ fetcher }: UseInfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const cursorIdRef = useRef<number | undefined>(undefined);
  const isFetchingRef = useRef(false);
  const requestSeqRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const fetchData = useCallback(async ({ replace = false }: { replace?: boolean } = {}) => {
    if (isFetchingRef.current) return;

    const requestSeq = requestSeqRef.current;
    isFetchingRef.current = true;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcherRef.current(cursorIdRef.current);

      if (requestSeq !== requestSeqRef.current) return;

      setItems((prev) => (replace ? result.data : [...prev, ...result.data]));
      setTotalCount((prev) => result.totalCount ?? prev);
      cursorIdRef.current = result.nextCursorId ?? undefined;
      setHasMore(result.nextCursorId !== null);
    } catch (err) {
      if (requestSeq !== requestSeqRef.current) return;

      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    } finally {
      if (requestSeq === requestSeqRef.current) {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
            fetchData();
          }
        },
        { root: scrollContainerRef.current, threshold: 0.5 },
      );

      observerRef.current.observe(node);
    },
    [hasMore, fetchData],
  );

  const reset = useCallback(async () => {
    requestSeqRef.current += 1;
    setItems([]);
    setHasMore(true);
    setIsLoading(true);
    setError(null);
    setTotalCount(0);
    cursorIdRef.current = undefined;
    isFetchingRef.current = false;
    await fetchData({ replace: true });
  }, [fetchData]);

  return {
    items,
    isLoading,
    error,
    hasMore,
    lastItemRef,
    totalCount,
    scrollContainerRef,
    reset,
  };
}
