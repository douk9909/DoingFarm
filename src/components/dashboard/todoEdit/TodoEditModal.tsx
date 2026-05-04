'use client';

import Modal from '@/components/common/modal/Modal';
import TodoEditContent from './TodoEditContent';
import type { TodoEditProps } from './TodoEdit';
import styles from '@/components/dashboard/todoCreate/TodoCreateModal.module.css';

export default function TodoEditModal(props: TodoEditProps) {
  return (
    <Modal
      title="할 일 수정"
      onClose={props.onClose}
      closeLabel="할 일 수정 모달 닫기"
      contentClassName={styles.todoModal}
    >
      <TodoEditContent {...props} />
    </Modal>
  );
}