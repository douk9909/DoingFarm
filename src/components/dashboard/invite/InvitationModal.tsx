'use client';

import { useState } from 'react';
import { dashboardApi } from '@/lib/api/dashboard';
import { useDashboardCreateModal } from '../create/DashboardCreateModalProvider';

import Image from 'next/image';
import characterImg from '@/assets/character/carrot1.svg';
import Button from '@/components/common/button/Button';
import Input from '@/components/common/input';
import Modal from '@/components/common/modal/Modal';

import styles from './InvitationModal.module.css';

interface DashboardInviteModalProps {
  dashboardId: number;
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
}

export default function DashboardInviteModal({
  dashboardId,
  isOpen,
  onClose,
  onInvite,
}: DashboardInviteModalProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const { notifyDashboardCreated } = useDashboardCreateModal();

  const validEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInvite = async () => {
    if (!validEmail(inviteEmail)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    try {
      setIsPending(true);
      setEmailError('');

      await dashboardApi.invite(dashboardId, inviteEmail);

      notifyDashboardCreated();
      onInvite(inviteEmail);
      setInviteEmail('');
      setIsPending(false);
      onClose();
      // Todo: 초대 성공 시 알림 추가
      alert('초대가 성공적으로 전송되었습니다.');
    } catch (error) {
      setEmailError('초대에 실패했습니다. 다시 시도해주세요.');

      return;
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Modal title={'🔗 초대하기'} onClose={onClose} contentClassName={styles.characterWrapper}>
      <Image
        src={characterImg}
        alt="캐릭터 이미지"
        width={60}
        height={72}
        className={styles.characterImage}
      />
      <Input.Text
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        value={inviteEmail}
        onChange={(e) => {
          setInviteEmail(e.target.value);
          if (emailError) setEmailError('');
        }}
        status={emailError ? 'error' : 'default'}
        errorMsg={emailError}
      />
      <div className={styles.modalButtonWrapper}>
        <Button type="button" variant="secondary" onClick={onClose} className={styles.modalButton}>
          취소
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleInvite}
          disabled={!inviteEmail || !!emailError || isPending}
          className={styles.modalButton}
        >
          공유
        </Button>
      </div>
    </Modal>
  );
}
