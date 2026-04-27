'use client';

import { useState } from 'react';
import Modal from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import ColorPicker from '@/components/common/colorPicker/colorPicker';
import { Input } from '@/components/common/input/Input';
import { DASHBOARD_COLORS } from '@/lib/constants/color';
import styles from './DashboardCreateModal.module.css';

interface DashboardCreateModalProps {
  onClose: () => void;
}

export default function DashboardCreateModal({ onClose }: DashboardCreateModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<string>(DASHBOARD_COLORS[0]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // API 연결은 다음 작업에서 추가합니다.
  };

  return (
    <Modal title="새 대시보드 생성" onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="대시보드 이름"
          value={title}
          placeholder="새로운 대시보드"
          onChange={(event) => setTitle(event.target.value)}
        />

        <div className={styles.fieldGroup}>
          <span className={styles.label}>색상</span>
          <ColorPicker selectedColor={color} onSelect={setColor} />
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            className={styles.cancelButton}
            onClick={onClose}
          >
            취소
          </Button>
          <Button type="submit" size="lg" fullWidth className={styles.submitButton}>
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
}
