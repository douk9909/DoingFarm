import { useCallback, useRef } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  root?: React.RefObject<HTMLElement | null> | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * 특정 엘리먼트가 뷰포트(또는 지정된 root)에 들어왔을 때 콜백을 실행하는 훅입니다.
 */
export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = '0px',
  threshold = 0.5,
}: UseIntersectionObserverProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      // 기존 옵저버 연결 해제
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // 비활성화 상태거나 노드가 없으면 중단
      if (!enabled || !node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        {
          root: root && 'current' in root ? root.current : root,
          rootMargin,
          threshold,
        },
      );
      observerRef.current.observe(node);
    },
    [enabled, onIntersect, root, rootMargin, threshold],
  );
  return ref;
}
