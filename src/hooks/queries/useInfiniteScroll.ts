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

  //fetcher를 ref에 저장 — 매 렌더링마다 최신 fetcher로 갱신
  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const fetchData = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    setIsLoading(true);
    setError(null);
    try {
      //ref를 통해 호출 — 의존성 배열에 fetcher 안 넣어도 항상 최신
      const result = await fetcherRef.current(cursorIdRef.current);
      setItems((prev) => [...prev, ...result.data]);
      setTotalCount((prev) => result.totalCount ?? prev);
      cursorIdRef.current = result.nextCursorId ?? undefined;
      setHasMore(result.nextCursorId !== null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 언마운트 시 옵저버 정리
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
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
    [hasMore, fetchData],
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
