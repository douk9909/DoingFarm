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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchData = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    setIsLoading(true);
    try {
      const result = await fetcher(cursorIdRef.current);
      setItems((prev) => [...prev, ...result.data]);
      setTotalCount(result.totalCount ?? 0);
      cursorIdRef.current = result.nextCursorId ?? undefined;
      setHasMore(result.nextCursorId !== null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  };

  // 최초 1회 fetch
  useEffect(() => {
    fetchData();
  }, []);

  // 마지막 아이템이 보일 때 fetch (PC/모바일 공통)
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
            fetchData();
          }
        },
        { root: scrollContainerRef.current, threshold: 0.5 },
      );

      if (node) observerRef.current.observe(node);
    },
    [hasMore],
  );

  return {
    items,
    isLoading,
    error,
    hasMore,
    lastItemRef,
    totalCount,
    scrollContainerRef,
  };
}
