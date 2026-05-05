'use client';

import TodoViewContent from './TodoViewContent';
import type { TodoViewContentProps } from './TodoViewContent';
import styles from './TodoView.module.css';

type TodoViewPageProps = Omit<TodoViewContentProps, never>;

export default function TodoViewPage(props: TodoViewPageProps) {
  return (
    <div className={styles.pageOverlay}>
      <div className={styles.pageContainer}>
        <TodoViewContent {...props} />
      </div>
    </div>
  );
}
