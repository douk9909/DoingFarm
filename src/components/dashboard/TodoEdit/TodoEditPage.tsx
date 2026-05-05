'use client';

import TodoEditContent from './TodoEditContent';
import type { TodoEditProps } from './TodoEdit';
import styles from '@/components/dashboard/todoCreate/TodoCreateModal.module.css';

export default function TodoEditPage(props: TodoEditProps) {
  return (
    <div className={styles.pageOverlay}>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h2>할 일 수정</h2>
          <button
            type="button"
            className={styles.pageCloseButton}
            aria-label="할 일 수정 페이지 닫기"
            onClick={props.onClose}
          >
            ×
          </button>
        </div>

        <TodoEditContent {...props} />
      </div>
    </div>
  );
}