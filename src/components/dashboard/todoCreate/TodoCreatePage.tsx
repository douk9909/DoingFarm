'use client';

import TodoCreateContent from './TodoCreateContent';
import type { TodoCreateProps } from './TodoCreate';
import styles from './TodoCreateModal.module.css';

export default function TodoCreatePage(props: TodoCreateProps) {
  return (
    <div className={styles.pageOverlay}>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h2>할 일 생성</h2>
          <button
            type="button"
            className={styles.pageCloseButton}
            aria-label="할 일 생성 페이지 닫기"
            onClick={props.onClose}
          >
            ×
          </button>
        </div>

        <TodoCreateContent {...props} />
      </div>
    </div>
  );
}