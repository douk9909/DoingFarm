'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import ColorPicker from '@/components/common/colorPicker/colorPicker';
import { Input } from '@/components/common/input';
import { useCreateDashboard } from '@/hooks/mutations/useCreateDashboard';
import { DASHBOARD_COLORS, type DashboardColor } from '@/lib/constants/color';
import characterImg from '@/assets/character/carrot1.svg';
import styles from './DashboardCreateModal.module.css';

interface DashboardCreateModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export default function DashboardCreateModal({ onClose, onCreated }: DashboardCreateModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<DashboardColor>(DASHBOARD_COLORS[0]);
  const { createDashboard, isPending, error } = useCreateDashboard();
  const isSubmitDisabled = title.trim().length === 0 || isPending;

  const handleSelectColor = (nextColor: string) => {
    if (DASHBOARD_COLORS.includes(nextColor as DashboardColor)) {
      setColor(nextColor as DashboardColor);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createdDashboard = await createDashboard({
      title: title.trim(),
      color,
    });

    if (createdDashboard) {
      // 생성 후 사이드바 목록을 다시 불러오도록 알림
      onCreated();
      onClose();
    }
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
          status={error ? 'error' : 'default'}
          errorMsg={error ?? undefined}
          isDisabled={isPending}
          onChange={(event) => setTitle(event.target.value)}
        />

        <div className={styles.fieldGroup}>
          <span className={styles.label}>색상</span>
          <ColorPicker selectedColor={color} onSelect={handleSelectColor} />
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            className={styles.cancelButton}
            disabled={isPending}
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
            {isPending ? '생성 중' : '생성'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
