'use client';

import Modal from '@/components/common/modal/Modal';
import TodoViewContent from './TodoViewContent';
import type { TodoViewContentProps } from './TodoViewContent';
import styles from './TodoView.module.css';

type TodoViewModalProps = Omit<TodoViewContentProps, never>;

export default function TodoViewModal(props: TodoViewModalProps) {
  return (
    <Modal onClose={props.onClose} size="contentLg" contentClassName={styles.modalContent}>
      <TodoViewContent {...props} />
    </Modal>
  );
}
