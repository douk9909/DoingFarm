import { useState, useEffect } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialSize?: number;
  isResponsive?: boolean;
}

export function usePagination({
  initialPage = 1,
  initialSize = 4,
  isResponsive = false,
}: UsePaginationProps) {
  // 반응형
  const getResponsiveSize = () => {
    if (typeof window === 'undefined') return initialSize;
    const width = window.innerWidth;
    if (width >= 1200) return 3;
    return 1;
  };

  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    if (!isResponsive) return;

    const handleResize = () => {
      const newSize = getResponsiveSize();
      setSize((prevSize) => {
        if (newSize !== prevSize) {
          setPage(1);
          return newSize;
        }
        return prevSize;
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isResponsive]);

  const goToNext = () => setPage((prev) => prev + 1);
  const goToPrev = () => setPage((prev) => Math.max(prev - 1, 1));

  return {
    page,
    size,
    setPage,
    goToNext,
    goToPrev,
  };
}
