import { useCallback, useEffect, useRef, useState } from 'react';

interface UsePaginatedFetchProps<T> {
  fetcher: (cursorId?: number) => Promise<{
    data: T[];
    totalCount?: number;
    nextCursorId: number | null;
  }>;
}

/**
 * cursor 기반 페이지네이션 데이터 페칭 상태를 관리하는 훅입니다.
 * 무한 스크롤 트리거 로직과 무관하게, 데이터 로딩/리셋/에러 처리만 담당합니다.
 *
 * @example
 * const { items, isLoading, hasNextPage, fetchNext, reset } = usePaginatedFetch({ fetcher: fetchProducts });
 * const lastItemRef = useInfiniteScroll({ onLoadMore: fetchNext, hasNextPage, isLoading });
 */
export function usePaginatedFetch<T>({ fetcher }: UsePaginatedFetchProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const cursorIdRef = useRef<number | undefined>(undefined);
  const isFetchingRef = useRef(false);
  const requestSeqRef = useRef(0);

  // fetcher가 변경되어도 항상 최신 참조를 사용 (stale closure 방지)
  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const fetchNext = useCallback(async ({ replace = false }: { replace?: boolean } = {}) => {
    if (isFetchingRef.current) return;

    const requestSeq = requestSeqRef.current;
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcherRef.current(cursorIdRef.current);

      // 요청이 오래된 경우 (reset 등으로 requestSeq가 바뀐 경우) 무시
      if (requestSeq !== requestSeqRef.current) return;

      setItems((prev) => (replace ? result.data : [...prev, ...result.data]));
      setTotalCount((prev) => result.totalCount ?? prev);
      cursorIdRef.current = result.nextCursorId ?? undefined;
      setHasNextPage(result.nextCursorId !== null);
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

  // 초기 데이터 로딩
  useEffect(() => {
    fetchNext();
  }, [fetchNext]);

  const reset = useCallback(async () => {
    // 진행 중인 요청을 무효화
    requestSeqRef.current += 1;
    cursorIdRef.current = undefined;
    isFetchingRef.current = false;

    setItems([]);
    setHasNextPage(true);
    setIsLoading(true);
    setError(null);
    setTotalCount(0);

    await fetchNext({ replace: true });
  }, [fetchNext]);

  return {
    items,
    isLoading,
    error,
    hasNextPage,
    totalCount,
    fetchNext,
    reset,
  };
}
