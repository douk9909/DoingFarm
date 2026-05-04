'use client';

import Modal from '@/components/common/modal/Modal';
import TodoCreateContent from './TodoCreateContent';
import type { TodoCreateProps } from './TodoCreate';
import styles from './TodoCreateModal.module.css';

export default function TodoCreateModal(props: TodoCreateProps) {
  return (
    <Modal
      title="할 일 생성"
      onClose={props.onClose}
      closeLabel="할 일 생성 모달 닫기"
      contentClassName={styles.todoModal}
    >
      <TodoCreateContent {...props} />
    </Modal>
  );
}