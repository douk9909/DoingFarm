import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps<T> {
  fetcher: (cursorId?: number) => Promise<{
    data: T[];
    totalCount: number;
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
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    setIsLoading(true);
    try {
      const result = await fetcher(cursorIdRef.current);
      setItems((prev) => [...prev, ...result.data]);
      setTotalCount(result.totalCount);
      cursorIdRef.current = result.nextCursorId ?? undefined;
      setHasMore(result.nextCursorId !== null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchData();
        }
      },
      { root: scrollContainerRef.current },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return {
    items,
    isLoading,
    error,
    hasMore,
    loaderRef,
    totalCount,
    scrollContainerRef,
  };
}
