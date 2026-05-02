import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';

import styles from '../edit.module.css';

interface PaginationControlProps {
  page: number;
  totalPages: number;
  goToNext: () => void;
  goToPrev: () => void;
}

export default function PaginationControl({
  page,
  totalPages,
  goToNext,
  goToPrev,
}: PaginationControlProps) {
  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  return (
    <div className={styles.pageWrapper}>
      <span className={styles.pageInfo}>
        {totalPages || 1} 페이지 중 {page}
      </span>
      <div className={styles.pageButton}>
        <button onClick={goToPrev} disabled={isFirstPage}>
          <ArrowLeftIcon
            size={20}
            color={isFirstPage ? 'var(--color-gray-200)' : 'var(--color-gray-800)'}
          />
        </button>
        <button onClick={goToNext} disabled={isLastPage}>
          <ArrowRightIcon
            size={20}
            color={isLastPage ? 'var(--color-gray-200)' : 'var(--color-gray-800)'}
          />
        </button>
      </div>
    </div>
  );
}
