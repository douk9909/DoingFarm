import Modal from '@/components/common/modal/Modal';
import Input from '@/components/common/input';
import { useState } from 'react';
import Button from '@/components/common/button/Button';
import styles from './AddColumnModal.module.css';

interface AddColumnModalProps {
  onClose: () => void;
}

export default function AddColumnModal({ onClose }: AddColumnModalProps) {
  const [title, setTitle] = useState('');

  return (
    <Modal contentClassName={styles.AddColumnModal} title="새 컬럼 생성" onClose={onClose}>
      <Input.Text type="text" label="이름" placeholder="컬럼 이름" />
      <div className={styles.buttonWrapper}>
        <Button className={styles.button} variant="secondary">
          취소
        </Button>
        <Button className={styles.button}>생성</Button>
      </div>
    </Modal>
  );
}
