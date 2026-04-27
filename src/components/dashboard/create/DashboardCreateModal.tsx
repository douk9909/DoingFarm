'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import ColorPicker from '@/components/common/colorPicker/colorPicker';
import { Input } from '@/components/common/input/index';
import { DASHBOARD_COLORS } from '@/lib/constants/color';
import characterImg from '@/assets/character/carrot1.svg';
import styles from './DashboardCreateModal.module.css';

interface DashboardCreateModalProps {
  onClose: () => void;
}

export default function DashboardCreateModal({ onClose }: DashboardCreateModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<string>(DASHBOARD_COLORS[0]);
  // 공백만 입력한 이름은 생성할 수 없게 처리
  const isSubmitDisabled = title.trim().length === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 생성 API 연결 전까지 기본 submit 동작만 차단
  };

  return (
    <Modal title="새 대시보드 생성" onClose={onClose}>
      <Image
        src={characterImg}
        alt=""
        width={60}
        height={72}
        className={styles.characterImage}
        aria-hidden
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input.Text
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
          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={isSubmitDisabled}
            className={styles.submitButton}
          >
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
}
