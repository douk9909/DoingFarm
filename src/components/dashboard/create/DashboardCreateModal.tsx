'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import ColorPicker from '@/components/common/colorPicker/colorPicker';
import { Input } from '@/components/common/input';
<<<<<<< HEAD
import { useCreateDashboard } from '@/hooks/mutations/useCreateDashboard';
import { DASHBOARD_COLORS, type DashboardColor } from '@/lib/constants/color';
=======
import { DASHBOARD_COLORS } from '@/lib/constants/color';
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
import characterImg from '@/assets/character/carrot1.svg';
import styles from './DashboardCreateModal.module.css';

interface DashboardCreateModalProps {
  onClose: () => void;
<<<<<<< HEAD
  onCreated: () => void;
}

export default function DashboardCreateModal({ onClose, onCreated }: DashboardCreateModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<DashboardColor>(DASHBOARD_COLORS[0]);
  const { createDashboard, isPending, error } = useCreateDashboard();
  // 공백만 입력한 이름은 생성할 수 없게 처리
  const isSubmitDisabled = title.trim().length === 0 || isPending;

  const handleSelectColor = (nextColor: string) => {
    // 공통 ColorPicker 값 중 대시보드 팔레트에 있는 색상만 저장
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
      // 생성 성공 후 목록 반영은 사이드바 API 연결에서 처리
      onCreated();
      onClose();
    }
=======
}

export default function DashboardCreateModal({ onClose }: DashboardCreateModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<string>(DASHBOARD_COLORS[0]);
  // 공백만 입력한 이름은 생성할 수 없게 처리
  const isSubmitDisabled = title.trim().length === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 생성 API 연결 전까지 기본 submit 동작만 차단
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
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
<<<<<<< HEAD
          status={error ? 'error' : 'default'}
          errorMsg={error ?? undefined}
          isDisabled={isPending}
=======
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
          onChange={(event) => setTitle(event.target.value)}
        />

        <div className={styles.fieldGroup}>
          <span className={styles.label}>색상</span>
<<<<<<< HEAD
          <ColorPicker selectedColor={color} onSelect={handleSelectColor} />
=======
          <ColorPicker selectedColor={color} onSelect={setColor} />
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            className={styles.cancelButton}
<<<<<<< HEAD
            disabled={isPending}
=======
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
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
<<<<<<< HEAD
            {isPending ? '생성 중' : '생성'}
=======
            생성
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
          </Button>
        </div>
      </form>
    </Modal>
  );
}
