import { useIntersectionObserver } from './useIntersectionObserver';

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  root?: React.RefObject<HTMLElement | null> | null;
}
/**
 * 데이터 페칭 로직과 무관하게, 무한 스크롤 트리거 로직만 담당하는 훅
 * onLoadMore, hasNextPage, isLoading을 받아 언제 더 불러올지만 결정
 */
export function useInfiniteScroll({
  onLoadMore,
  hasNextPage,
  isLoading,
  root = null,
}: UseInfiniteScrollProps) {
  const lastItemRef = useIntersectionObserver({
    onIntersect: onLoadMore,
    enabled: hasNextPage && !isLoading,
    root,
    threshold: 0.5,
  });

  return lastItemRef;
}
