import { useState } from 'react';

interface paginationProps {
  page: number;
  size: number;
  setPage: (page: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
}

export function usePagination(initialPage: number = 1, initialSize: number = 4): paginationProps {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const goToNext = () => setPage((prev) => prev + 1);
  const goToPrev = () => setPage((prev) => prev - 1);

  return {
    page,
    size,
    setPage,
    goToNext,
    goToPrev,
  };
}
