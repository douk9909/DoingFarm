import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps<T> {
  fetcher: (cursorId?: number) => Promise<{
    data: T[];
    totalCount: number;
    nextCursorId: number | null;
  }>;
}

const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1200;

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
  const mobileObserverRef = useRef<IntersectionObserver | null>(null);

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

  // 최초 1회 fetch
  useEffect(() => {
    fetchData();
  }, []);

  // 모바일/태블릿: 마지막 카드가 보일 때 fetch
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isDesktop()) return;
      if (mobileObserverRef.current) mobileObserverRef.current.disconnect();

      mobileObserverRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
            fetchData();
          }
        },
        { root: scrollContainerRef.current, threshold: 0.5 },
      );

      if (node) mobileObserverRef.current.observe(node);
    },
    [hasMore],
  );

  // PC: loader div가 보일 때 fetch
  useEffect(() => {
    if (!isDesktop() || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
          fetchData();
        }
      },
      { root: scrollContainerRef.current, threshold: 0.1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return {
    items,
    isLoading,
    error,
    hasMore,
    loaderRef,
    lastItemRef,
    totalCount,
    scrollContainerRef,
  };
}
